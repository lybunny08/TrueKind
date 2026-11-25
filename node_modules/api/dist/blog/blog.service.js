var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let BlogService = class BlogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const where = { published: true };
        if (filters?.category) {
            where.category = { slug: filters.category };
        }
        if (filters?.featured !== undefined) {
            where.featured = filters.featured;
        }
        return this.prisma.blogPost.findMany({
            where,
            include: { category: true },
            orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        });
    }
    async findBySlug(slug) {
        const post = await this.prisma.blogPost.findUnique({
            where: { slug },
            include: { category: true },
        });
        if (!post)
            throw new NotFoundException("Article not found");
        return post;
    }
    async findFeatured() {
        return this.prisma.blogPost.findMany({
            where: { featured: true, published: true },
            include: { category: true },
            orderBy: { publishedAt: "desc" },
            take: 3,
        });
    }
    async findCategories() {
        return this.prisma.blogCategory.findMany({
            include: { _count: { select: { posts: true } } },
            orderBy: { name: "asc" },
        });
    }
};
BlogService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BlogService);
export { BlogService };
//# sourceMappingURL=blog.service.js.map