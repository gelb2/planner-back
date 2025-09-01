import { Module } from '@nestjs/common';
import { NicknameController } from './controllers/nickname.controller';
import { NicknameService } from './services/nickname.service';

@Module({
  controllers: [NicknameController],
  providers: [NicknameService],
  exports: [NicknameService],
})
export class NicknameModule {}