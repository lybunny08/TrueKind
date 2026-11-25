import { PrismaService } from "../prisma/prisma.service.js";
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        category?: string;
        featured?: boolean;
    }): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: string | null;
        featured: boolean;
        image: string | null;
        title: string;
        excerpt: string | null;
        content: string | null;
        published: boolean;
        publishedAt: Date | null;
    })[]>;
    findBySlug(slug: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: string | null;
        featured: boolean;
        image: string | null;
        title: string;
        excerpt: string | null;
        content: string | null;
        published: boolean;
        publishedAt: Date | null;
    }>;
    findFeatured(): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        categoryId: string | null;
        featured: boolean;
        image: string | null;
        title: string;
        excerpt: string | null;
        content: string | null;
        published: boolean;
        publishedAt: Date | null;
    })[]>;
    findCategories(): Promise<({
        _count: {
            posts: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    })[]>;
}
