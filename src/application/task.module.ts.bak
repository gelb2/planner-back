import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../domain/entities/task.entity';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TaskRepository } from '../infrastructure/repositories/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    {
      provide: 'ITaskService',
      useClass: TaskService,
    },
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
  ],
  exports: ['ITaskService'],
})
export class TaskModule {}