import { Controller, Get } from '@nestjs/common';
import { TaskService } from '../services/task.service';

@Controller('api/v1/stats')
export class StatsController {
  constructor(private readonly taskService: TaskService) {}

  @Get('dashboard')
  async getDashboardStats() {
    try {
      const stats = await this.taskService.getStats();
      return {
        success: true,
        data: stats,
        message: 'Dashboard stats retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve dashboard stats',
        error: error.message
      };
    }
  }
}