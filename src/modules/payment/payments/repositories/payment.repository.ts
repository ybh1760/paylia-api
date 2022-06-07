import { plainToInstance } from 'class-transformer';
import { EntityRepository } from 'typeorm';

import { BaseRepository } from '@common/repositories';

import { PaymentEntity } from '../domain';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends BaseRepository<PaymentEntity> {
  plainToClass(entities: PaymentEntity[]) {
    return plainToInstance(PaymentEntity, entities);
  }
}
