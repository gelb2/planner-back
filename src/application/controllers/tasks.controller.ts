import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  Query, 
  ValidationPipe,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import type { TasksQueryParams } from '../services/task.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskStatus } from '../../domain/entities/task.entity';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(@Query() query: TasksQueryParams) {
    try {
      const result = await this.taskService.findAll(query);
      return {
        success: true,
        data: result,
        message: 'Tasks retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve tasks',
        error: error.message
      };
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    try {
      const task = await this.taskService.findOne(id);
      return {
        success: true,
        data: task,
        message: 'Task retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve task',
        error: error.message
      };
    }
  }

  @Post()
  async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskService.create(createTaskDto);
      return {
        success: true,
        data: task,
        message: 'Task created successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to create task',
        error: error.message
      };
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto
  ) {
    try {
      const task = await this.taskService.update(id, updateTaskDto);
      return {
        success: true,
        data: task,
        message: 'Task updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to update task',
        error: error.message
      };
    }
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ) {
    try {
      const task = await this.taskService.updateStatus(id, status);
      return {
        success: true,
        data: task,
        message: 'Task status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to update task status',
        error: error.message
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteTask(@Param('id') id: string) {
    try {
      await this.taskService.remove(id);
      return {
        success: true,
        message: 'Task deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete task',
        error: error.message
      };
    }
  }
}