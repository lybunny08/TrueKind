var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { createObserveModule } from "@nestjs/observe";
import { PrismaModule } from "./prisma/prisma.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { UsersModule } from "./users/users.module.js";
import { ProductsModule } from "./products/products.module.js";
import { CategoriesModule } from "./categories/categories.module.js";
import { CollectionsModule } from "./collections/collections.module.js";
import { CartModule } from "./cart/cart.module.js";
import { OrdersModule } from "./orders/orders.module.js";
import { PaymentsModule } from "./payments/payments.module.js";
import { NewsletterModule } from "./newsletter/newsletter.module.js";
import { BlogModule } from "./blog/blog.module.js";
import { AdminModule } from "./admin/admin.module.js";
export const { ObserveModule, ObserveInstrument } = createObserveModule();
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            ObserveModule.forRoot({
                appKey: process.env.OBSERVE_APP_KEY ?? "YOUR_APP_KEY",
                appSecret: process.env.OBSERVE_APP_SECRET ?? "YOUR_APP_SECRET",
                serviceId: "api",
            }),
            PrismaModule,
            AuthModule,
            UsersModule,
            ProductsModule,
            CategoriesModule,
            CollectionsModule,
            CartModule,
            OrdersModule,
            PaymentsModule,
            NewsletterModule,
            BlogModule,
            AdminModule,
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map