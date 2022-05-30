import { ForbiddenException } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { PageQuery } from './dtos';
import { BaseRepository } from './repositories';

export abstract class BaseService<
  Entity extends { id: number },
  Relations = Array<keyof Entity | `${string & keyof Entity}.${string}`>,
> {
  abstract repository: BaseRepository<Entity>;

  async get(id: number, relations?: Relations): Promise<Entity> {
    return await this.repository.get(id, relations as unknown as string[]);
  }

  async list(pageQuery?: PageQuery, relations?: Relations): Promise<Entity[]> {
    const _pageQuery = plainToInstance(PageQuery, pageQuery);

    return await this.repository.find({
      relations: (relations as any) ?? [],
      order: { id: 'DESC' } as any,
      ...(pageQuery && _pageQuery?.pageFilter),
    });
  }

  async findOne(
    partial: FindConditions<Entity>,
    relations?: Relations,
  ): Promise<Entity> {
    return await this.repository.findOne(
      { ...partial, ...instanceToPlain(partial) },
      {
        relations: relations as unknown as string[],
      },
    );
  }

  async count(partial: FindConditions<Entity>): Promise<number> {
    return await this.repository.count({
      ...partial,
      ...instanceToPlain(partial),
    });
  }

  async checkBelongsTo(ids: number[], userId: number): Promise<void> {
    const isMine = await this.repository.checkBelongsTo(ids, userId);
    if (!isMine) {
      throw new ForbiddenException('자신의 리소스가 아닙니다.');
    }
  }
}
