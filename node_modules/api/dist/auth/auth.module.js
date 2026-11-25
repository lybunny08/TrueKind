var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "../prisma/prisma.module.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            ConfigModule,
            PassportModule.register({ defaultStrategy: "jwt" }),
            JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (config) => ({
                    secret: config.get("JWT_ACCESS_SECRET") || "default-secret",
                    signOptions: {
                        expiresIn: config.get("JWT_ACCESS_EXPIRATION") || "15m",
                    },
                }),
                inject: [ConfigService],
            }),
        ],
        providers: [
            AuthService,
            JwtStrategy,
            JwtAuthGuard,
            RolesGuard,
            {
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
            },
            {
                provide: APP_GUARD,
                useClass: RolesGuard,
            },
        ],
        controllers: [AuthController],
        exports: [AuthService, JwtAuthGuard],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map