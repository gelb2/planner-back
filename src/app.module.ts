import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
// import { TaskModule } from './application/task.module';
import { NicknameModule } from './application/nickname.module';
import { TasksController } from './application/controllers/tasks.controller';
import { StatsController } from './application/controllers/stats.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    // TaskModule,
    NicknameModule,
  ],
  controllers: [AppController, TasksController, StatsController],
  providers: [AppService],
})
export class AppModule {}
