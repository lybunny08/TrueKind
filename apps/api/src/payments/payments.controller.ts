import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  UseGuards,
  HttpCode,
} from "@nestjs/common";
import type { Request } from "express";
import { Public } from "../common/decorators/public.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { User } from "../common/decorators/user.decorator.js";
import { PaymentsService } from "./payments.service.js";
import type { AuthenticatedUser } from "../common/types.js";

interface AuthRequest extends Request {
  user?: { id: string };
  body: Buffer;
}

@Controller("payments")
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @Post("checkout")
  @UseGuards(JwtAuthGuard)
  createCheckout(
    @User() user: AuthenticatedUser,
    @Body()
    body: {
      orderId: string;
      successUrl: string;
      cancelUrl: string;
    }
  ) {
    return this.payments.createCheckoutSession(
      body.orderId,
      user.id,
      body.successUrl,
      body.cancelUrl
    );
  }

  @Post("webhook")
  @Public()
  @HttpCode(200)
  webhook(
    @Req() req: AuthRequest,
    @Headers("stripe-signature") signature: string
  ) {
    return this.payments.handleWebhook(req.body, signature);
  }
}