import { ProductsService } from "./products.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
export declare class ProductsController {
    private products;
    constructor(products: ProductsService);
    findAll(collection?: string, category?: string, featured?: string, search?: string): Promise<({
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
        price: import("@prisma/client/runtime/library").Decimal;
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
            price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
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
        price: import("@prisma/client/runtime/library").Decimal;
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
