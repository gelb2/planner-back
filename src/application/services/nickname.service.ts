import { Injectable } from '@nestjs/common';

@Injectable()
export class NicknameService {
  private readonly adjectives = [
    'Happy', 'Clever', 'Brave', 'Swift', 'Bright', 'Cool', 'Smart', 'Bold',
    'Gentle', 'Kind', 'Wild', 'Fast', 'Strong', 'Quick', 'Wise', 'Lucky'
  ];

  private readonly nouns = [
    'Tiger', 'Eagle', 'Dragon', 'Phoenix', 'Wolf', 'Lion', 'Bear', 'Fox',
    'Shark', 'Falcon', 'Panther', 'Hawk', 'Lynx', 'Raven', 'Jaguar', 'Cobra'
  ];

  generateRandomNickname(): string {
    const randomAdjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    const randomNoun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    
    return `${randomAdjective}${randomNoun}${randomNumber}`;
  }

  generateMultipleNicknames(count: number = 5): string[] {
    const nicknames: string[] = [];
    for (let i = 0; i < count; i++) {
      nicknames.push(this.generateRandomNickname());
    }
    return nicknames;
  }
}