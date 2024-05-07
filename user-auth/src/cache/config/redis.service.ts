import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getData(key: string) {
    return await this.cache.get(key);
  }

  async setData(key: string, value: any) {
    return await this.cache.set(key, value);
  }

  async deleteData(key: string) {
    return await this.cache.del(key);
  }

  async resetStore() {
    await this.cache.reset();
  }
}
