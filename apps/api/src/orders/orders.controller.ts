import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import type { OrderStatus } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { User } from "../common/decorators/user.decorator.js";
import { OrdersService } from "./orders.service.js";
import type { AuthenticatedUser, CreateOrderInput } from "../common/types.js";

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Post()
  create(@User() user: AuthenticatedUser, @Body() body: CreateOrderInput) {
    return this.orders.createOrder(user.id, body);
  }

  @Get()
  findAll(@User() user: AuthenticatedUser) {
    return this.orders.findAll(user.id);
  }

  @Get(":id")
  findById(@User() user: AuthenticatedUser, @Param("id") id: string) {
    return this.orders.findById(id, user.id);
  }

  @Roles("ADMIN")
  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: { status: OrderStatus }
  ) {
    return this.orders.updateStatus(id, body.status);
  }
}