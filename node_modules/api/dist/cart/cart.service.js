var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: { orderBy: { position: "asc" }, take: 1 },
                            },
                        },
                    },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: { orderBy: { position: "asc" }, take: 1 },
                                },
                            },
                        },
                    },
                },
            });
        }
        return cart;
    }
    async getCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        const subtotal = cart.items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);
        const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        return { ...cart, subtotal, itemCount };
    }
    async addItem(userId, productId, quantity = 1) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product || !product.inStock) {
            throw new BadRequestException("Product not available");
        }
        const cart = await this.getOrCreateCart(userId);
        const existing = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: cart.id, productId },
            },
        });
        if (existing) {
            return this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
        }
        return this.prisma.cartItem.create({
            data: { cartId: cart.id, productId, quantity },
        });
    }
    async updateQuantity(userId, productId, quantity) {
        const cart = await this.getOrCreateCart(userId);
        if (quantity <= 0) {
            return this.removeItem(userId, productId);
        }
        const item = await this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: { cartId: cart.id, productId },
            },
        });
        if (!item) {
            throw new BadRequestException("Item not in cart");
        }
        return this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity },
        });
    }
    async removeItem(userId, productId) {
        const cart = await this.getOrCreateCart(userId);
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id, productId },
        });
        return { message: "Item removed" };
    }
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        return { message: "Cart cleared" };
    }
};
CartService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map