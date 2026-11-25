import { BlogService } from "./blog.service.js";
export declare class BlogController {
    private blog;
    constructor(blog: BlogService);
    findAll(category?: string, featured?: string): Promise<({
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
}
