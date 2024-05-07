import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/cache/config/redis.service';

@Injectable()
export class accessKeyValidatorHelperService {
  constructor(private readonly redisService: RedisService) {}

  async setAccessKey(email: string, accessKey: string) {
    await this.redisService.setData(email, accessKey);
  }

  async validateAccessKey(email: string, accessKey: string): Promise<boolean> {
    const storedAccessKey = await this.redisService.getData(email);
    if (storedAccessKey === null || storedAccessKey !== accessKey) {
      return false;
    }
    return true;
  }
}
