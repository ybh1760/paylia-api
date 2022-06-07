import { plainToInstance } from 'class-transformer';
import { EntityRepository } from 'typeorm';

import { BaseRepository } from '@common/repositories';

import { TossDataEntity } from '../domain';

@EntityRepository(TossDataEntity)
export class TossDataRepository extends BaseRepository<TossDataEntity> {
  plainToClass(entities: TossDataEntity[]) {
    return plainToInstance(TossDataEntity, entities);
  }
}
