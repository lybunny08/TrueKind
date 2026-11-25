import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: {
    collection?: string;
    category?: string;
    featured?: boolean;
    search?: string;
  }) {
    const where: Prisma.ProductWhereInput = {};

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

  async findBySlug(slug: string) {
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

  async findById(id: string) {
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

  async create(dto: CreateProductDto) {
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
              create: images.map((url: string, index: number) => ({
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

  async update(id: string, dto: UpdateProductDto) {
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
              create: images.map((url: string, index: number) => ({
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

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
    return { message: "Product deleted" };
  }
}