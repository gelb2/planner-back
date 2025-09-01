import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ITaskService } from '../../domain/services/task.service.interface';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../../domain/entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly taskService: ITaskService,
  ) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('completed')
  async getCompletedTasks(): Promise<Task[]> {
    return this.taskService.getCompletedTasks();
  }

  @Get('pending')
  async getPendingTasks(): Promise<Task[]> {
    return this.taskService.getPendingTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Put(':id/complete')
  async markTaskAsCompleted(@Param('id') id: string): Promise<Task> {
    return this.taskService.markTaskAsCompleted(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}