import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service.js";
export declare class PaymentsService {
    private prisma;
    private config;
    private readonly logger;
    private stripe;
    constructor(prisma: PrismaService, config: ConfigService);
    createCheckoutSession(orderId: string, userId: string, successUrl: string, cancelUrl: string): Promise<{
        sessionId: string;
        url: string | null;
        mock: boolean;
    }>;
    handleWebhook(payload: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
}
