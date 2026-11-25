import type { OrderStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: string, data: {
        addressId?: string;
        items: Array<{
            productId: string;
            quantity: number;
        }>;
        shipping?: number;
        tax?: number;
    }): Promise<{
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
    findAll(userId: string): Promise<({
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
    findById(orderId: string, userId: string): Promise<{
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
    updateStatus(orderId: string, status: OrderStatus): Promise<{
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
