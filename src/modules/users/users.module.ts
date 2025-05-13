import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { PasswordService } from './password/password.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  providers: [UsersService, PasswordService, AuthService],
})
export class UsersModule {}
