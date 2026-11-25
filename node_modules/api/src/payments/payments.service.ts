import { Injectable, BadRequestException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe | null = null;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService
  ) {
    const secret = this.config.get<string>("STRIPE_SECRET_KEY");
    if (secret && !secret.startsWith("sk_test_placeholder")) {
      this.stripe = new Stripe(secret);
    }
  }

  async createCheckoutSession(
    orderId: string,
    userId: string,
    successUrl: string,
    cancelUrl: string
  ) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: { include: { product: true } } },
    });

    if (!order) throw new BadRequestException("Order not found");

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

  async handleWebhook(payload: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>("STRIPE_WEBHOOK_SECRET");

    if (!webhookSecret || webhookSecret.startsWith("whsec_placeholder")) {
      this.logger.warn("Stripe webhook secret not configured");
      return { received: true };
    }

    if (!this.stripe) {
      throw new BadRequestException("Stripe not configured");
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
    } catch {
      throw new BadRequestException("Invalid webhook signature");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
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
}