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
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard.js";
import { User } from "../common/decorators/user.decorator.js";
import { CartService } from "./cart.service.js";
let CartController = class CartController {
    cart;
    constructor(cart) {
        this.cart = cart;
    }
    getCart(user) {
        return this.cart.getCart(user.id);
    }
    addItem(user, body) {
        return this.cart.addItem(user.id, body.productId, body.quantity || 1);
    }
    updateQuantity(user, productId, body) {
        return this.cart.updateQuantity(user.id, productId, body.quantity);
    }
    removeItem(user, productId) {
        return this.cart.removeItem(user.id, productId);
    }
    clearCart(user) {
        return this.cart.clearCart(user.id);
    }
};
__decorate([
    Get(),
    __param(0, User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    Post("items"),
    __param(0, User()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    Patch("items/:productId"),
    __param(0, User()),
    __param(1, Param("productId")),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateQuantity", null);
__decorate([
    Delete("items/:productId"),
    __param(0, User()),
    __param(1, Param("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
__decorate([
    Delete(),
    __param(0, User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
CartController = __decorate([
    Controller("cart"),
    UseGuards(JwtAuthGuard),
    __metadata("design:paramtypes", [CartService])
], CartController);
export { CartController };
//# sourceMappingURL=cart.controller.js.map