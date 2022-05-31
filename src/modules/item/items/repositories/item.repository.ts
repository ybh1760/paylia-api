import { EntityRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { BaseRepository } from '@common/repositories';

import { ItemEntity } from '../domain';

@EntityRepository(ItemEntity)
export class ItemRepository extends BaseRepository<ItemEntity> {
  plainToClass(entities: ItemEntity[]): ItemEntity[] {
    return plainToInstance(ItemEntity, entities);
  }
}
