import type { OrderStatus } from "@prisma/client";
import { OrdersService } from "./orders.service.js";
import type { AuthenticatedUser, CreateOrderInput } from "../common/types.js";
export declare class OrdersController {
    private orders;
    constructor(orders: OrdersService);
    create(user: AuthenticatedUser, body: CreateOrderInput): Promise<{
        items: ({
            product: {
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            total: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        currency: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        addressId: string | null;
    }>;
    findAll(user: AuthenticatedUser): Promise<({
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            status: string;
            orderId: string;
            stripePaymentIntentId: string | null;
            stripeCheckoutSessionId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
        } | null;
        items: ({
            product: {
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            total: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        currency: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        addressId: string | null;
    })[]>;
    findById(user: AuthenticatedUser, id: string): Promise<{
        address: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            type: string;
            firstName: string;
            lastName: string;
            company: string | null;
            address1: string;
            address2: string | null;
            city: string;
            state: string;
            postalCode: string;
            country: string;
            phone: string | null;
            isDefault: boolean;
        } | null;
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            status: string;
            orderId: string;
            stripePaymentIntentId: string | null;
            stripeCheckoutSessionId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
        } | null;
        items: ({
            product: {
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
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            total: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        currency: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        addressId: string | null;
    }>;
    updateStatus(id: string, body: {
        status: OrderStatus;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        currency: string;
        orderNumber: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        shipping: import("@prisma/client/runtime/library").Decimal;
        total: import("@prisma/client/runtime/library").Decimal;
        addressId: string | null;
    }>;
}
