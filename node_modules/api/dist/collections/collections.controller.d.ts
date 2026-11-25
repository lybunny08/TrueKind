import { CollectionsService } from "./collections.service.js";
export declare class CollectionsController {
    private collections;
    constructor(collections: CollectionsService);
    findAll(): Promise<({
        _count: {
            products: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        image: string | null;
    })[]>;
    findBySlug(slug: string): Promise<{
        products: ({
            category: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
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
        })[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        image: string | null;
    }>;
}
