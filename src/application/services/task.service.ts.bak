import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { ITaskService } from '../../domain/services/task.service.interface';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    return this.taskRepository.create(taskData);
  }

  async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const existingTask = await this.getTaskById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = await this.taskRepository.update(id, taskData);
    if (!updatedTask) {
      throw new NotFoundException(`Failed to update task with ID ${id}`);
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const existingTask = await this.getTaskById(id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const deleted = await this.taskRepository.delete(id);
    if (!deleted) {
      throw new Error(`Failed to delete task with ID ${id}`);
    }
  }

  async getCompletedTasks(): Promise<Task[]> {
    return this.taskRepository.findByCompleted(true);
  }

  async getPendingTasks(): Promise<Task[]> {
    return this.taskRepository.findByCompleted(false);
  }

  async markTaskAsCompleted(id: string): Promise<Task> {
    return this.updateTask(id, { completed: true });
  }
}