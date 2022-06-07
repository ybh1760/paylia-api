import { Injectable } from '@nestjs/common';

import { BaseService } from '@common/base.service';

import { TossDataEntity } from './domain';
import { TossDataRepository } from './repositories';

@Injectable()
export class TossDatasService extends BaseService<TossDataEntity> {
  constructor(readonly repository: TossDataRepository) {
    super();
  }

  async create(
    input: Pick<TossDataEntity, 'paymentKey' | 'secret' | 'orderId'>,
  ) {
    return await this.repository.save(new TossDataEntity(input));
  }
}
