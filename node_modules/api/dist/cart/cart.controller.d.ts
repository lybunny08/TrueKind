import { CartService } from "./cart.service.js";
import type { AuthenticatedUser } from "../common/types.js";
export declare class CartController {
    private cart;
    constructor(cart: CartService);
    getCart(user: AuthenticatedUser): Promise<{
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
    addItem(user: AuthenticatedUser, body: {
        productId: string;
        quantity?: number;
    }): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    }>;
    updateQuantity(user: AuthenticatedUser, productId: string, body: {
        quantity: number;
    }): Promise<{
        id: string;
        productId: string;
        cartId: string;
        quantity: number;
    } | {
        message: string;
    }>;
    removeItem(user: AuthenticatedUser, productId: string): Promise<{
        message: string;
    }>;
    clearCart(user: AuthenticatedUser): Promise<{
        message: string;
    }>;
}
