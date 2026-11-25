import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  Post,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { User as UserDecorator } from "../common/decorators/user.decorator.js";
import { UsersService } from "./users.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
import type { AuthenticatedUser, AddressInput } from "../common/types.js";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private users: UsersService,
    private prisma: PrismaService
  ) {}

  @Get("me")
  getProfile(@UserDecorator() user: AuthenticatedUser) {
    return this.users.findById(user.id);
  }

  @Patch("me")
  updateProfile(
    @UserDecorator() user: AuthenticatedUser,
    @Body() body: { name?: string; email?: string }
  ) {
    return this.users.updateProfile(user.id, body);
  }

  @Get("addresses")
  getAddresses(@UserDecorator() user: AuthenticatedUser) {
    return this.users.getAddresses(user.id);
  }

  @Post("addresses")
  createAddress(
    @UserDecorator() user: AuthenticatedUser,
    @Body() body: AddressInput
  ) {
    return this.users.createAddress(user.id, body);
  }

  @Patch("addresses/:id")
  updateAddress(
    @UserDecorator() user: AuthenticatedUser,
    @Param("id") addressId: string,
    @Body() body: Partial<AddressInput>
  ) {
    return this.users.updateAddress(addressId, user.id, body);
  }

  @Delete("addresses/:id")
  deleteAddress(
    @UserDecorator() user: AuthenticatedUser,
    @Param("id") addressId: string
  ) {
    return this.users.deleteAddress(addressId, user.id);
  }

  @Roles("ADMIN")
  @Get()
  async listUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }
}