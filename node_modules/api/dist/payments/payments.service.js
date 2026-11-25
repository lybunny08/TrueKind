var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
import { Injectable, BadRequestException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service.js";
let PaymentsService = PaymentsService_1 = class PaymentsService {
    prisma;
    config;
    logger = new Logger(PaymentsService_1.name);
    stripe = null;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        const secret = this.config.get("STRIPE_SECRET_KEY");
        if (secret && !secret.startsWith("sk_test_placeholder")) {
            this.stripe = new Stripe(secret);
        }
    }
    async createCheckoutSession(orderId, userId, successUrl, cancelUrl) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: { items: { include: { product: true } } },
        });
        if (!order)
            throw new BadRequestException("Order not found");
        if (!this.stripe) {
            return {
                sessionId: `mock_${orderId}`,
                url: `${successUrl}?session_id=mock_${orderId}`,
                mock: true,
            };
        }
        const lineItems = order.items.map((item) => ({
            price_data: {
                currency: order.currency.toLowerCase(),
                product_data: { name: item.product.name },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity,
        }));
        const session = await this.stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: { orderId, userId },
        });
        await this.prisma.payment.upsert({
            where: { orderId },
            create: {
                orderId,
                stripeCheckoutSessionId: session.id,
                amount: order.total,
                currency: order.currency,
                status: "pending",
            },
            update: {
                stripeCheckoutSessionId: session.id,
            },
        });
        return { sessionId: session.id, url: session.url, mock: false };
    }
    async handleWebhook(payload, signature) {
        const webhookSecret = this.config.get("STRIPE_WEBHOOK_SECRET");
        if (!webhookSecret || webhookSecret.startsWith("whsec_placeholder")) {
            this.logger.warn("Stripe webhook secret not configured");
            return { received: true };
        }
        if (!this.stripe) {
            throw new BadRequestException("Stripe not configured");
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        }
        catch {
            throw new BadRequestException("Invalid webhook signature");
        }
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const orderId = session.metadata?.orderId;
            if (orderId) {
                await this.prisma.payment.updateMany({
                    where: { orderId },
                    data: { status: "completed" },
                });
                await this.prisma.order.update({
                    where: { id: orderId },
                    data: { status: "CONFIRMED" },
                });
            }
        }
        return { received: true };
    }
};
PaymentsService = PaymentsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ConfigService])
], PaymentsService);
export { PaymentsService };
//# sourceMappingURL=payments.service.js.map