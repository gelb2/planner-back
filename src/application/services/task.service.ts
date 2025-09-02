import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

export interface TasksQueryParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(params: TasksQueryParams = {}) {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    // Apply filters
    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (category) {
      queryBuilder.andWhere('task.category = :category', { category });
    }

    if (search) {
      queryBuilder.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Apply sorting
    queryBuilder.orderBy(`task.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    // Apply pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [tasks, total] = await queryBuilder.getManyAndCount();

    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      dueDate: new Date(createTaskDto.dueDate),
      userId: createTaskDto.userId || 'user-1', // Default user
    });

    return await this.taskRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    const updateData: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      updateData.dueDate = new Date(updateTaskDto.dueDate);
    }

    await this.taskRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    await this.taskRepository.update(id, { status });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async getStats() {
    const totalTasks = await this.taskRepository.count();
    const completedTasks = await this.taskRepository.count({
      where: { status: TaskStatus.COMPLETED }
    });
    
    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todayTasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.dueDate >= :startOfDay', { startOfDay })
      .andWhere('task.dueDate < :endOfDay', { endOfDay })
      .getCount();

    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      completionRate,
      currentStreak: 1, // TODO: Calculate actual streak
      todayTasks,
    };
  }
}