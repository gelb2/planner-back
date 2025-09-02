import { IsString, IsOptional, IsEnum, IsDateString, IsInt, Min, Max } from 'class-validator';
import { TaskCategory, TaskStatus } from '../../domain/entities/task.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(TaskCategory)
  category: TaskCategory;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  estimatedMinutes?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  difficulty?: number;
}