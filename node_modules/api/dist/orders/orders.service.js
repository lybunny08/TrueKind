var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, data) {
        let subtotal = 0;
        const orderItems = [];
        for (const item of data.items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product || !product.inStock) {
                throw new NotFoundException(`Product ${item.productId} not available`);
            }
            const price = Number(product.price);
            const total = price * item.quantity;
            subtotal += total;
            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price,
                total,
            });
        }
        const shipping = data.shipping || 0;
        const tax = data.tax || 0;
        const total = subtotal + shipping + tax;
        const orderNumber = `TK-${Date.now().toString(36).toUpperCase()}`;
        const order = await this.prisma.order.create({
            data: {
                userId,
                orderNumber,
                addressId: data.addressId,
                subtotal,
                shipping,
                tax,
                total,
                items: {
                    create: orderItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.total,
                    })),
                },
            },
            include: {
                items: { include: { product: true } },
            },
        });
        return order;
    }
    async findAll(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: { include: { product: true } },
                payment: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findById(orderId, userId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                items: { include: { product: true } },
                payment: true,
                address: true,
            },
        });
        if (!order)
            throw new NotFoundException("Order not found");
        return order;
    }
    async updateStatus(orderId, status) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map