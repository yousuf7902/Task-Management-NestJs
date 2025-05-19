import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, SerializeOptions, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { send } from "process";
import { sendResponse } from "src/utils/send-response.utils";
import { LoginDto } from "../dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/user.decorator";
import { Role } from "../role.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "../roles.guard";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({strategy: "excludeAll"}) 
@ApiBearerAuth('JWT-auth')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto
  ) {
    try {
      const data = await this.authService.registerUser(createUserDto);

      if (!data) {
        return sendResponse(res, 404, "User not created...");
      }

      sendResponse(res, 200, "User created...", data);
    } catch (error) {
      throw error;
    }
  }

  @Post("login")
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginDto: LoginDto
  ) {
    try {
      const { email, password } = loginDto;
      const accessToken = await this.authService.loginUser(email, password);

      if (!accessToken) {
        return sendResponse(res, 0, "User not found");
      }

      sendResponse(res, 200, "User found...", { accessToken });
    } catch (error) {
      throw error;
    }
  }

}
