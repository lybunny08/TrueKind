import { CategoriesService } from "./categories.service.js";
export declare class CategoriesController {
    private categories;
    constructor(categories: CategoriesService);
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
    })[]>;
    findBySlug(slug: string): Promise<{
        products: ({
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
    }>;
}
