import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import dbConfigService from './config/database.config';
import { TasksController } from './modules/tasks/controllers/tasks.controller';
import { TasksService } from './modules/tasks/services/tasks.service';
import { Task } from './modules/tasks/entities/task.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()), TypeOrmModule.forFeature([Task]), TasksModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
