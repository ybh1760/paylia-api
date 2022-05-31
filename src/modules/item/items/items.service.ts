import { Injectable } from '@nestjs/common';

import { BaseService } from '@common/base.service';

import { ItemEntity } from './domain';
import { ItemRepository } from './repositories';

@Injectable()
export class ItemsService extends BaseService<ItemEntity> {
  constructor(readonly repository: ItemRepository) {
    super();
  }
}
