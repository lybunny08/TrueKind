import { PrismaService } from "../prisma/prisma.service.js";
export declare class NewsletterService {
    private prisma;
    constructor(prisma: PrismaService);
    subscribe(email: string): Promise<{
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
