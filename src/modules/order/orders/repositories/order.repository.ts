import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  EntityRepository,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from 'typeorm';

import { OrderEntity } from '../domain';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  private isEntity(obj: unknown): obj is OrderEntity {
    return obj !== undefined && (obj as OrderEntity).merchantUid !== undefined;
  }

  private plainToClass(entities: OrderEntity[]) {
    return plainToInstance(OrderEntity, entities);
  }

  async get(
    merchantUid: string,
    relations: string[] = [],
  ): Promise<OrderEntity | null> {
    return await this.findOne({
      where: { merchantUid },
      relations,
    })
      .then((entity) => {
        if (!this.isEntity(entity)) {
          throw new NotFoundException('Model not found.');
        }

        return this.plainToClass([entity])[0];
      })
      .catch((error) => Promise.reject(error));
  }

  async find(options?: FindManyOptions<OrderEntity>): Promise<OrderEntity[]>;
  async find(conditions?: FindConditions<OrderEntity>): Promise<OrderEntity[]>;
  async find(...args): Promise<OrderEntity[]> {
    const entities = await super.find(...args);
    return this.plainToClass(entities);
  }

  async findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<OrderEntity>,
  ): Promise<OrderEntity>;
  async findOne(options?: FindOneOptions<OrderEntity>): Promise<OrderEntity>;
  async findOne(
    conditions?: FindConditions<OrderEntity>,
    options?: FindOneOptions<OrderEntity>,
  ): Promise<OrderEntity>;
  async findOne(...args): Promise<OrderEntity> {
    const entity = await super.findOne(...args);
    return this.plainToClass([entity])[0];
  }

  async checkExist(merchantUid: string): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .where('merchantUid = :merchantUid', { merchantUid })
      .execute();
    return result?.length > 0;
  }
}
