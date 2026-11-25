import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator.js";
import { CollectionsService } from "./collections.service.js";

@Controller("collections")
export class CollectionsController {
  constructor(private collections: CollectionsService) {}

  @Public()
  @Get()
  findAll() {
    return this.collections.findAll();
  }

  @Public()
  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.collections.findBySlug(slug);
  }
}