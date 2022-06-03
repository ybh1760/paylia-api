import { plainToInstance } from 'class-transformer';
import { EntityRepository } from 'typeorm';

import { BaseRepository } from '@common/repositories';

import { UserEntity } from '../domain';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  plainToClass(entities: UserEntity[]): UserEntity[] {
    return plainToInstance(UserEntity, entities);
  }
}
