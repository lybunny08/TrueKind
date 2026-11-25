import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { ProductsService } from "./products.service.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Controller("products")
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Public()
  @Get()
  findAll(
    @Query("collection") collection?: string,
    @Query("category") category?: string,
    @Query("featured") featured?: string,
    @Query("search") search?: string
  ) {
    return this.products.findAll({
      collection,
      category,
      featured: featured === "true" ? true : undefined,
      search,
    });
  }

  @Public()
  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.products.findBySlug(slug);
  }

  @Post()
  @Roles("ADMIN")
  create(@Body() dto: CreateProductDto) {
    return this.products.create(dto);
  }

  @Patch(":id")
  @Roles("ADMIN")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @Delete(":id")
  @Roles("ADMIN")
  remove(@Param("id") id: string) {
    return this.products.remove(id);
  }
}