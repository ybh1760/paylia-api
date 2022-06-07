import { Injectable } from '@nestjs/common';

import { BaseService } from '@common/base.service';

import { FirstOrderLogEntity } from './domain';
import { FirstOrderLogRepository } from './repositories';

@Injectable()
export class FirstOrderLogsService extends BaseService<FirstOrderLogEntity> {
  constructor(readonly repository: FirstOrderLogRepository) {
    super();
  }

  async checkExist(userId: number) {
    return await this.repository.checkExist(userId);
  }

  async create(userId: number) {
    await this.repository.save(new FirstOrderLogEntity({ userId }));
  }
}
