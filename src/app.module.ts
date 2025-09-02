import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { TaskModule } from './application/task.module';
import { NicknameModule } from './application/nickname.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    TaskModule,
    NicknameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
