import type { Request } from "express";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";
interface AuthRequest extends Request {
    user?: {
        id: string;
    };
    body: {
        refreshToken?: string;
    };
}
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string | null;
            role: import("@prisma/client").$Enums.Role;
        };
    }>;
    logout(req: AuthRequest): {
        message: string;
    };
    refresh(req: AuthRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    profile(req: AuthRequest): {
        id: string;
    } | undefined;
}
export {};
