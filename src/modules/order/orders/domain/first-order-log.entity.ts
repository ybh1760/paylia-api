import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseIdEntity } from '@common/entities';

import { UserEntity } from '@user/users/domain';

@Entity({ name: 'first_order_log' })
export class FirstOrderLogEntity extends BaseIdEntity {
  constructor(attrs?: Partial<FirstOrderLogEntity>) {
    super(attrs);
    if (!attrs) {
      return;
    }

    this.user = attrs.user;
    this.userId = attrs.userId;
  }

  @OneToOne('UserEntity', { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
  @Column()
  userId: number;
}
