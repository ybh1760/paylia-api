import { Column, Entity } from 'typeorm';

import { BaseIdEntity } from '@common/entities';

@Entity('user')
export class UserEntity extends BaseIdEntity {
  constructor(attrs?: Partial<UserEntity>) {
    super(attrs);
    if (!attrs) {
      return;
    }

    this.ip = attrs.ip;
  }

  @Column()
  ip: string;
}
