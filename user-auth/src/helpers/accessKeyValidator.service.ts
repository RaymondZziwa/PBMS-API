import { Injectable } from '@nestjs/common';
//import { RedisService } from 'src/cache/config/redis.service';

@Injectable()
export class accessKeyValidatorHelperService {
  //constructor(private readonly redisService: RedisService) {}

  tempStorage = new Map();

  async setAccessKey(email: string, accessKey: string) {
    //await this.redisService.setData(email, accessKey);
    this.tempStorage.set(email, { accessKey, createdAt: Date.now() });
  }

  async validateAccessKey(email: string): Promise<boolean> {
    //const storedAccessKey = await this.redisService.getData(email);
    const data = this.tempStorage.get(email);

    if (data && Date.now() - data.createdAt < 3600000) {
      return true;
    } else {
      return false;
    }
  }
}
