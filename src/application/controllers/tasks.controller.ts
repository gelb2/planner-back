import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/tasks')
export class TasksController {
  @Get()
  async getAllTasks() {
    // 테스트용 더미 데이터
    const mockTasks = [
      {
        id: '1',
        title: '프로젝트 기획서 작성',
        description: '새로운 웹 애플리케이션 프로젝트를 위한 기획서를 작성합니다.',
        category: 'work',
        status: 'in_progress',
        dueDate: new Date(),
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(),
        userId: '1',
        estimatedMinutes: 120,
        difficulty: 3
      },
      {
        id: '2',
        title: 'React 강의 수강',
        description: 'React 고급 기능에 대한 온라인 강의를 수강합니다.',
        category: 'study',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000),
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(),
        userId: '1',
        estimatedMinutes: 90,
        difficulty: 2
      },
      {
        id: '3',
        title: '헬스장 운동',
        description: '주 3회 헬스장에서 웨이트 트레이닝을 합니다.',
        category: 'exercise',
        status: 'completed',
        dueDate: new Date(Date.now() - 86400000),
        createdAt: new Date(Date.now() - 86400000 * 2),
        updatedAt: new Date(Date.now() - 86400000),
        userId: '1',
        estimatedMinutes: 60,
        difficulty: 2
      }
    ];

    return {
      success: true,
      data: {
        tasks: mockTasks,
        pagination: {
          page: 1,
          limit: 20,
          total: mockTasks.length,
          totalPages: 1
        }
      },
      message: 'Tasks retrieved successfully'
    };
  }
}