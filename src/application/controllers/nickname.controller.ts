import { Controller, Get, Query } from '@nestjs/common';
import { NicknameService } from '../services/nickname.service';

@Controller('nickname')
export class NicknameController {
  constructor(private readonly nicknameService: NicknameService) {}

  @Get('random')
  getRandomNickname(): { nickname: string } {
    const nickname = this.nicknameService.generateRandomNickname();
    return { nickname };
  }

  @Get('multiple')
  getMultipleNicknames(@Query('count') count?: string): { nicknames: string[] } {
    const nicknameCount = count ? parseInt(count, 10) : 5;
    const nicknames = this.nicknameService.generateMultipleNicknames(nicknameCount);
    return { nicknames };
  }
}