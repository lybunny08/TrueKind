import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { category?: string; featured?: boolean }) {
    const where: Prisma.BlogPostWhereInput = { published: true };
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

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (!post) throw new NotFoundException("Article not found");
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
}