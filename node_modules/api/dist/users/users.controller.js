var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Patch, Body, Param, Post, Delete, UseGuards, } from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator.js";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { RolesGuard } from "../common/guards/roles.guard.js";
import { User as UserDecorator } from "../common/decorators/user.decorator.js";
import { UsersService } from "./users.service.js";
import { PrismaService } from "../prisma/prisma.service.js";
let UsersController = class UsersController {
    users;
    prisma;
    constructor(users, prisma) {
        this.users = users;
        this.prisma = prisma;
    }
    getProfile(user) {
        return this.users.findById(user.id);
    }
    updateProfile(user, body) {
        return this.users.updateProfile(user.id, body);
    }
    getAddresses(user) {
        return this.users.getAddresses(user.id);
    }
    createAddress(user, body) {
        return this.users.createAddress(user.id, body);
    }
    updateAddress(user, addressId, body) {
        return this.users.updateAddress(addressId, user.id, body);
    }
    deleteAddress(user, addressId) {
        return this.users.deleteAddress(addressId, user.id);
    }
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
};
__decorate([
    Get("me"),
    __param(0, UserDecorator()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    Patch("me"),
    __param(0, UserDecorator()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    Get("addresses"),
    __param(0, UserDecorator()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAddresses", null);
__decorate([
    Post("addresses"),
    __param(0, UserDecorator()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createAddress", null);
__decorate([
    Patch("addresses/:id"),
    __param(0, UserDecorator()),
    __param(1, Param("id")),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateAddress", null);
__decorate([
    Delete("addresses/:id"),
    __param(0, UserDecorator()),
    __param(1, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteAddress", null);
__decorate([
    Roles("ADMIN"),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listUsers", null);
UsersController = __decorate([
    Controller("users"),
    UseGuards(JwtAuthGuard, RolesGuard),
    __metadata("design:paramtypes", [UsersService,
        PrismaService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map