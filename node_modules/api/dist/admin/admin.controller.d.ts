import { PrismaService } from "../prisma/prisma.service.js";
export declare class AdminController {
    private prisma;
    constructor(prisma: PrismaService);
    dashboard(): Promise<{
        users: number;
        products: number;
        orders: number;
        subscribers: number;
        posts: number;
    }>;
    listUsers(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    listOrders(): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            email: string;
            name: string | null;
        };
        items: {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            total: import("@prisma/client/runtime/library").Decimal;
            orderId: string;
        }[];
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
    listSubscribers(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        id: string;
        subscribedAt: Date;
        isActive: boolean;
    }[]>;
}
