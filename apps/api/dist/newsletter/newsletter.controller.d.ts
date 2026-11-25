import { NewsletterService } from "./newsletter.service.js";
export declare class NewsletterController {
    private newsletter;
    constructor(newsletter: NewsletterService);
    subscribe(body: {
        email: string;
    }): Promise<{
        email: string;
        id: string;
        subscribedAt: Date;
        isActive: boolean;
    }>;
    findAll(): Promise<{
        email: string;
        id: string;
        subscribedAt: Date;
        isActive: boolean;
    }[]>;
}
