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
import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator.js";
import { BlogService } from "./blog.service.js";
let BlogController = class BlogController {
    blog;
    constructor(blog) {
        this.blog = blog;
    }
    findAll(category, featured) {
        return this.blog.findAll({
            category,
            featured: featured === "true" ? true : undefined,
        });
    }
    findFeatured() {
        return this.blog.findFeatured();
    }
    findCategories() {
        return this.blog.findCategories();
    }
    findBySlug(slug) {
        return this.blog.findBySlug(slug);
    }
};
__decorate([
    Public(),
    Get(),
    __param(0, Query("category")),
    __param(1, Query("featured")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findAll", null);
__decorate([
    Public(),
    Get("featured"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findFeatured", null);
__decorate([
    Public(),
    Get("categories"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findCategories", null);
__decorate([
    Public(),
    Get(":slug"),
    __param(0, Param("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "findBySlug", null);
BlogController = __decorate([
    Controller("blog"),
    __metadata("design:paramtypes", [BlogService])
], BlogController);
export { BlogController };
//# sourceMappingURL=blog.controller.js.map