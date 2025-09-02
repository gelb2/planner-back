import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TaskCategory {
  WORK = 'work',
  STUDY = 'study',
  EXERCISE = 'exercise',
  HOBBY = 'hobby',
  OTHER = 'other'
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TaskCategory, default: TaskCategory.OTHER })
  category: TaskCategory;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'varchar', length: 255, default: 'user-1' })
  userId: string;

  @Column({ type: 'int', nullable: true })
  estimatedMinutes?: number;

  @Column({ type: 'int', nullable: true })
  difficulty?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}