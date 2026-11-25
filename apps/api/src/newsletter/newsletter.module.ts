import { Module } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service.js";
import { NewsletterController } from "./newsletter.controller.js";

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService],
  exports: [NewsletterService],
})
export class NewsletterModule {}