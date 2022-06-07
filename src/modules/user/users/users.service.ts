import { ConflictException, Injectable } from '@nestjs/common';

import { BaseService } from '@common/base.service';

import { UserEntity } from './domain';
import { UserRepository } from './repositories';

@Injectable()
export class UsersService extends BaseService<UserEntity> {
  constructor(readonly repository: UserRepository) {
    super();
  }

  async create(input: Pick<UserEntity, 'ip'>) {
    return await this.repository.save(
      new UserEntity({ ...input, name: '양병훈' }),
    );
  }
}
