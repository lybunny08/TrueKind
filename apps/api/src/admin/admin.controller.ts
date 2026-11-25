import { Controller, Get, UseGuards } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN")
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get("dashboard")
  async dashboard() {
    const [users, products, orders, subscribers, posts] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.newsletterSubscriber.count(),
      this.prisma.blogPost.count(),
    ]);

    return { users, products, orders, subscribers, posts };
  }

  @Get("users")
  listUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  @Get("orders")
  listOrders() {
    return this.prisma.order.findMany({
      include: { items: true, user: { select: { email: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  @Get("subscribers")
  listSubscribers() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });
  }
}