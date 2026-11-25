import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        collection?: string;
        category?: string;
        featured?: boolean;
        search?: string;
    }): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        images: {
            id: string;
            createdAt: Date;
            position: number;
            url: string;
            alt: string | null;
            productId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        price: Prisma.Decimal;
        currency: string;
        categoryId: string | null;
        collectionId: string | null;
        volume: string | null;
        inStock: boolean;
        featured: boolean;
    })[]>;
    findBySlug(slug: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        images: {
            id: string;
            createdAt: Date;
            position: number;
            url: string;
            alt: string | null;
            productId: string;
        }[];
        variants: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            price: Prisma.Decimal;
            productId: string;
            sku: string;
            stock: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        price: Prisma.Decimal;
        currency: string;
        categoryId: string | null;
        collectionId: string | null;
        volume: string | null;
        inStock: boolean;
        featured: boolean;
    }>;
    findById(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        images: {
            id: string;
            createdAt: Date;
            position: number;
            url: string;
            alt: string | null;
            productId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        price: Prisma.Decimal;
        currency: string;
        categoryId: string | null;
        collectionId: string | null;
        volume: string | null;
        inStock: boolean;
        featured: boolean;
    }>;
    create(dto: CreateProductDto): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        images: {
            id: string;
            createdAt: Date;
            position: number;
            url: string;
            alt: string | null;
            productId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        price: Prisma.Decimal;
        currency: string;
        categoryId: string | null;
        collectionId: string | null;
        volume: string | null;
        inStock: boolean;
        featured: boolean;
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        } | null;
        collection: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            description: string | null;
            image: string | null;
        } | null;
        images: {
            id: string;
            createdAt: Date;
            position: number;
            url: string;
            alt: string | null;
            productId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        price: Prisma.Decimal;
        currency: string;
        categoryId: string | null;
        collectionId: string | null;
        volume: string | null;
        inStock: boolean;
        featured: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
