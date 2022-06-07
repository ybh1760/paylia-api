import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ItemEntity } from '@item/items/domain';
import { UserEntity } from '@user/users/domain';
import { PayMethod } from '@payment/payments/constants';
import { OrderStatus } from '../constants';
import { Expose } from 'class-transformer';

@Entity('order')
export class OrderEntity {
  constructor(attrs?: Partial<OrderEntity>) {
    if (!attrs) {
      return;
    }

    this.item = attrs.item;
    this.itemId = attrs.itemId;

    this.user = attrs.user;
    this.userId = attrs.userId;

    this.merchantUid = attrs.merchantUid;
    this.amount = attrs.amount;
    this.discountAmount = attrs.discountAmount;
    this.payMethod = attrs.payMethod;
    this.status = attrs.status;

    this.vbankReadyAt = attrs.vbankReadyAt;
    this.paidAt = attrs.paidAt;
  }

  @ManyToOne('item')
  @JoinColumn()
  item: ItemEntity;
  @Column()
  itemId: number;

  @ManyToOne('user')
  @JoinColumn()
  user: UserEntity;
  @Column()
  userId: number;

  @PrimaryColumn()
  merchantUid: string;
  @Column()
  amount: number;
  @Column({ default: 0 })
  discountAmount: number;
  @Column({ type: 'enum', enum: PayMethod })
  payMethod: PayMethod;
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ nullable: true })
  failedReason: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'datetime', nullable: true })
  payingAt: Date;
  @Column({ type: 'datetime', nullable: true })
  failedAt: Date;
  @Column({ type: 'datetime', nullable: true })
  vbankReadyAt: Date;
  @Column({ type: 'datetime', nullable: true })
  paidAt: Date;

  @Expose()
  get paidAmount() {
    return this.amount - this.discountAmount;
  }

  complete() {
    if (this.payMethod === PayMethod.Vbank) {
      this.markVbankReady();
    } else {
      this.markPaid();
    }
  }

  markPaying(payMethod: PayMethod) {
    this.payingAt = new Date();
    this.status = OrderStatus.Paying;
    this.payMethod = payMethod;
  }

  markPaid() {
    this.paidAt = new Date();
    this.status = OrderStatus.Paid;
  }

  markVbankReady() {
    this.vbankReadyAt = new Date();
    this.status = OrderStatus.VbankReady;
  }

  markFailed(reason: string) {
    this.failedAt = new Date();
    this.status = OrderStatus.Failed;
    this.failedReason = reason;
  }
}
