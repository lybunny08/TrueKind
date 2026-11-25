var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ConflictException, } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const where = {};
        if (filters?.collection) {
            where.collection = { slug: filters.collection };
        }
        if (filters?.category) {
            where.category = { slug: filters.category };
        }
        if (filters?.featured !== undefined) {
            where.featured = filters.featured;
        }
        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: "insensitive" } },
                { description: { contains: filters.search, mode: "insensitive" } },
            ];
        }
        return this.prisma.product.findMany({
            where,
            include: {
                category: true,
                collection: true,
                images: { orderBy: { position: "asc" } },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                collection: true,
                images: { orderBy: { position: "asc" } },
                variants: true,
            },
        });
        if (!product) {
            throw new NotFoundException(`Product with slug "${slug}" not found`);
        }
        return product;
    }
    async findById(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                collection: true,
                images: { orderBy: { position: "asc" } },
            },
        });
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return product;
    }
    async create(dto) {
        const existing = await this.prisma.product.findUnique({
            where: { slug: dto.slug },
        });
        if (existing) {
            throw new ConflictException("Product slug already exists");
        }
        const { images, ...productData } = dto;
        return this.prisma.product.create({
            data: {
                ...productData,
                price: dto.price,
                images: images
                    ? {
                        create: images.map((url, index) => ({
                            url,
                            position: index,
                        })),
                    }
                    : undefined,
            },
            include: {
                category: true,
                collection: true,
                images: { orderBy: { position: "asc" } },
            },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        const { images, ...productData } = dto;
        return this.prisma.product.update({
            where: { id },
            data: {
                ...productData,
                price: dto.price !== undefined ? dto.price : undefined,
                images: images
                    ? {
                        deleteMany: {},
                        create: images.map((url, index) => ({
                            url,
                            position: index,
                        })),
                    }
                    : undefined,
            },
            include: {
                category: true,
                collection: true,
                images: { orderBy: { position: "asc" } },
            },
        });
    }
    async remove(id) {
        await this.findById(id);
        await this.prisma.product.delete({ where: { id } });
        return { message: "Product deleted" };
    }
};
ProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map