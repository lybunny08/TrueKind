import type { Request } from "express";
import { PaymentsService } from "./payments.service.js";
import type { AuthenticatedUser } from "../common/types.js";
interface AuthRequest extends Request {
    user?: {
        id: string;
    };
    body: Buffer;
}
export declare class PaymentsController {
    private payments;
    constructor(payments: PaymentsService);
    createCheckout(user: AuthenticatedUser, body: {
        orderId: string;
        successUrl: string;
        cancelUrl: string;
    }): Promise<{
        sessionId: string;
        url: string | null;
        mock: boolean;
    }>;
    webhook(req: AuthRequest, signature: string): Promise<{
        received: boolean;
    }>;
}
export {};
