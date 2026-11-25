import { Controller, Get, Param, Query } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator.js";
import { BlogService } from "./blog.service.js";

@Controller("blog")
export class BlogController {
  constructor(private blog: BlogService) {}

  @Public()
  @Get()
  findAll(
    @Query("category") category?: string,
    @Query("featured") featured?: string
  ) {
    return this.blog.findAll({
      category,
      featured: featured === "true" ? true : undefined,
    });
  }

  @Public()
  @Get("featured")
  findFeatured() {
    return this.blog.findFeatured();
  }

  @Public()
  @Get("categories")
  findCategories() {
    return this.blog.findCategories();
  }

  @Public()
  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.blog.findBySlug(slug);
  }
}