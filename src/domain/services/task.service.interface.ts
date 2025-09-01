import { Task } from '../entities/task.entity';

export interface ITaskService {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  updateTask(id: string, taskData: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  getCompletedTasks(): Promise<Task[]>;
  getPendingTasks(): Promise<Task[]>;
  markTaskAsCompleted(id: string): Promise<Task>;
}