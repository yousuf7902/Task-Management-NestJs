import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import dbConfigService from './config/database.config';
import { TasksController } from './modules/tasks/controllers/tasks.controller';
import { TasksService } from './modules/tasks/services/tasks.service';
import { Task } from './modules/tasks/entities/task.entity';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { User } from './modules/users/entities/user.entity';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()), TypeOrmModule.forFeature([Task, User]), TasksModule, UsersModule],
  controllers: [TasksController, UsersController],
  providers: [TasksService],
})
export class AppModule {}
