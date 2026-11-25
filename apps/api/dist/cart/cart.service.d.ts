import { PrismaService } from "../prisma/prisma.service.js";
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateCart(userId: string): Promise<{
        items: ({
            product: {
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
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getCart(userId: string): Promise<{
        subtotal: number;
        itemCount: number;
        items: ({
            product: {
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
            };
        } & {
            id: string;
            productId: string;
            cartId: string;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    addItem(userId: string, productId: string, quantity?: number): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    }>;
    updateQuantity(userId: string, productId: string, quantity: number): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    } | {
        message: string;
    }>;
    removeItem(userId: string, productId: string): Promise<{
        message: string;
    }>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
}
