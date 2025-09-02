import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../domain/entities/task.entity';
import { TaskService } from './services/task.service';
import { TasksController } from './controllers/tasks.controller';
import { StatsController } from './controllers/stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController, StatsController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}