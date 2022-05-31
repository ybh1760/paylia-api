import { Column, Entity } from 'typeorm';

import { BaseIdEntity } from '@common/entities';

@Entity('item')
export class ItemEntity extends BaseIdEntity {
  constructor(attrs?: Partial<ItemEntity>) {
    super(attrs);
    if (!attrs) {
      return;
    }

    this.name = attrs.name;
    this.price = attrs.price;
  }

  @Column()
  name: string;
  @Column()
  price: number;
}
