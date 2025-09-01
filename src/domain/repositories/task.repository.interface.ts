import { Task } from '../entities/task.entity';

export interface ITaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
  findByCompleted(completed: boolean): Promise<Task[]>;
}