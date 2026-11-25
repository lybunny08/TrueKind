import { Controller, Post, Body, Get, Req, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { Public } from "../common/decorators/public.decorator.js";
import { AuthService } from "./auth.service.js";
import { RegisterDto } from "./dto/register.dto.js";
import { LoginDto } from "./dto/login.dto.js";

interface AuthRequest extends Request {
  user?: { id: string };
  body: { refreshToken?: string };
}

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Public()
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Post("logout")
  logout(@Req() req: AuthRequest) {
    const userId = req.user?.id;
    if (userId) {
      this.auth.logout(userId);
    }
    return { message: "Logged out" };
  }

  @Post("refresh")
  async refresh(@Req() req: AuthRequest) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token required");
    }
    return this.auth.refresh(req.user!.id, refreshToken);
  }

  @Get("profile")
  profile(@Req() req: AuthRequest) {
    return req.user;
  }
}