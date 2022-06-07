import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseIdEntity } from '@common/entities';
import { UserEntity } from '@user/users/domain';

import { PayMethod } from '../constants';
import { TossDataEntity } from './toss-data.entity';

@Entity('payment')
export class PaymentEntity extends BaseIdEntity {
  constructor(attrs?: Partial<PaymentEntity>) {
    super(attrs);
    if (!attrs) {
      return;
    }

    this.user = attrs.user;
    this.userId = attrs.userId;

    this.tossData = attrs.tossData;
    this.tossDataId = attrs.tossDataId;

    this.payMethod = attrs.payMethod;
    this.amount = attrs.amount;

    this.vbank = attrs.vbank;
    this.vbankNum = attrs.vbankNum;
    this.vbankDueDate = attrs.vbankDueDate;
  }

  @ManyToOne('UserEntity', { onDelete: 'CASCADE' })
  user: UserEntity;
  @Column()
  userId: number;

  @OneToOne('TossDataEntity', { nullable: true, cascade: true })
  @JoinColumn()
  tossData: TossDataEntity;
  @Column({ nullable: true })
  tossDataId: number;

  @Column({ type: 'enum', enum: PayMethod })
  payMethod: PayMethod;
  @Column()
  amount: number;

  @Column({ nullable: true })
  vbankNum: string;
  @Column({ nullable: true })
  vbank: string;
  @Column({ nullable: true })
  vbankDueDate: Date;
}
