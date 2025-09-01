import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/stats')
export class StatsController {
  @Get('dashboard')
  async getDashboardStats() {
    // 테스트용 더미 통계 데이터
    return {
      success: true,
      data: {
        totalTasks: 5,
        completedTasks: 1,
        completionRate: 20,
        currentStreak: 3,
        bestStreak: 7,
        todayTasks: 2,
        weeklyCompletion: [1, 0, 2, 1, 0, 1, 0],
        categoryStats: [
          { category: 'work', total: 2, completed: 0 },
          { category: 'study', total: 1, completed: 0 },
          { category: 'exercise', total: 1, completed: 1 },
          { category: 'hobby', total: 1, completed: 0 }
        ]
      },
      message: 'Dashboard stats retrieved successfully'
    };
  }
}