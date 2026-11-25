export declare class CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    price: number;
    currency?: string;
    categoryId?: string;
    collectionId?: string;
    volume?: string;
    inStock?: boolean;
    featured?: boolean;
    images?: string[];
}
