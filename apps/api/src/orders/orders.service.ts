import { Injectable, NotFoundException } from "@nestjs/common";
import type { OrderStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: string,
    data: {
      addressId?: string;
      items: Array<{ productId: string; quantity: number }>;
      shipping?: number;
      tax?: number;
    }
  ) {
    let subtotal = 0;
    const orderItems: Array<{
      productId: string;
      quantity: number;
      price: number;
      total: number;
    }> = [];

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

  async findAll(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: { include: { product: true } },
        payment: true,
        address: true,
      },
    });

    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}