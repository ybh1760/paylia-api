import { NotFoundException } from '@nestjs/common';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from 'typeorm';

export abstract class BaseRepository<
  Entity extends { id: number },
> extends Repository<Entity> {
  abstract plainToClass(entities: Entity[]): Entity[];

  protected isEntity(obj: unknown): obj is Entity {
    return obj !== undefined && (obj as Entity).id !== undefined;
  }

  async get(id: number, relations: string[] = []): Promise<Entity | null> {
    return await this.findOne({
      where: { id },
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

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  async find(conditions?: FindConditions<Entity>): Promise<Entity[]>;
  async find(...args): Promise<Entity[]> {
    const entities = await super.find(...args);
    return this.plainToClass(entities);
  }

  async findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  async findOne(options?: FindOneOptions<Entity>): Promise<Entity>;
  async findOne(
    conditions?: FindConditions<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;
  async findOne(...args): Promise<Entity> {
    const entity = await super.findOne(...args);
    return this.plainToClass([entity])[0];
  }

  async checkBelongsTo(ids: number[], userId: number): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .select('1')
      .where('id IN(:ids)', { ids })
      .andWhere('userId = :userId', { userId })
      .take(ids.length)
      .limit(ids.length)
      .execute();
    return result?.length === ids.length;
  }
}
