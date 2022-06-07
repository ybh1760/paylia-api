import { plainToInstance } from 'class-transformer';
import { EntityRepository } from 'typeorm';

import { BaseRepository } from '@common/repositories';

import { FirstOrderLogEntity } from '../domain';

@EntityRepository(FirstOrderLogEntity)
export class FirstOrderLogRepository extends BaseRepository<FirstOrderLogEntity> {
  plainToClass(entities: FirstOrderLogEntity[]): FirstOrderLogEntity[] {
    return plainToInstance(FirstOrderLogEntity, entities);
  }

  async checkExist(userId: number): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .where('userId = :userId', { userId })
      .execute();
    return result?.length > 0;
  }
}
