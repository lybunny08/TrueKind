import { Controller, Post, Body, Get } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator.js";
import { Roles } from "../common/decorators/roles.decorator.js";
import { NewsletterService } from "./newsletter.service.js";

@Controller("newsletter")
export class NewsletterController {
  constructor(private newsletter: NewsletterService) {}

  @Public()
  @Post("subscribe")
  subscribe(@Body() body: { email: string }) {
    return this.newsletter.subscribe(body.email);
  }

  @Roles("ADMIN")
  @Get()
  findAll() {
    return this.newsletter.findAll();
  }
}