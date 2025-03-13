import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import dbConfigService from './config/database.config';
import { TasksController } from './modules/tasks/controllers/tasks.controller';
import { TasksService } from './modules/tasks/services/tasks.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }), TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()), TasksModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
