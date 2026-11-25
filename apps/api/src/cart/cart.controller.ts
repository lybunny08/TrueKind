import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { User } from "../common/decorators/user.decorator.js";
import { CartService } from "./cart.service.js";
import type { AuthenticatedUser } from "../common/types.js";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cart: CartService) {}

  @Get()
  getCart(@User() user: AuthenticatedUser) {
    return this.cart.getCart(user.id);
  }

  @Post("items")
  addItem(
    @User() user: AuthenticatedUser,
    @Body() body: { productId: string; quantity?: number }
  ) {
    return this.cart.addItem(user.id, body.productId, body.quantity || 1);
  }

  @Patch("items/:productId")
  updateQuantity(
    @User() user: AuthenticatedUser,
    @Param("productId") productId: string,
    @Body() body: { quantity: number }
  ) {
    return this.cart.updateQuantity(user.id, productId, body.quantity);
  }

  @Delete("items/:productId")
  removeItem(
    @User() user: AuthenticatedUser,
    @Param("productId") productId: string
  ) {
    return this.cart.removeItem(user.id, productId);
  }

  @Delete()
  clearCart(@User() user: AuthenticatedUser) {
    return this.cart.clearCart(user.id);
  }
}