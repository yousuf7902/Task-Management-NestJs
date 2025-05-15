import { JwtModule, JwtService } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./modules/tasks/tasks.module";
import dbConfigService from "./config/database.config";
import { TasksController } from "./modules/tasks/controllers/tasks.controller";
import { TasksService } from "./modules/tasks/services/tasks.service";
import { Task } from "./modules/tasks/entities/task.entity";
import { UsersModule } from "./modules/users/users.module";
import { UsersController } from "./modules/users/controllers/users.controller";
import { User } from "./modules/users/entities/user.entity";
import { TaskLabel } from "./modules/tasks/entities/task-label.entity";
import { AuthService } from "./modules/users/auth/auth.service";
import { UsersService } from "./modules/users/services/users.service";
import { PasswordService } from "./modules/users/password/password.service";

@Module({
  imports: [JwtModule.register({
      global: true, 
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "1d" },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Task, User, TaskLabel]),
    TasksModule,
    UsersModule,
  ],
  controllers: [TasksController, UsersController],
  providers: [
    TasksService,
    AuthService,
    UsersService,
    JwtService,
    PasswordService,
  ],
})
export class AppModule {
  
}
