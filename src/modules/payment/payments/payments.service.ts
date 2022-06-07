import { Injectable } from '@nestjs/common';

import { BaseService } from '@common/base.service';

import { PaymentEntity } from './domain';
import { PaymentRepository } from './repositories';

@Injectable()
export class PaymentsService extends BaseService<PaymentEntity> {
  constructor(readonly repository: PaymentRepository) {
    super();
  }

  async create(
    input: Pick<
      PaymentEntity,
      | 'userId'
      | 'amount'
      | 'payMethod'
      | 'tossDataId'
      | 'vbankNum'
      | 'vbank'
      | 'vbankDueDate'
    >,
  ) {
    return await this.repository.save(new PaymentEntity(input));
  }
}
