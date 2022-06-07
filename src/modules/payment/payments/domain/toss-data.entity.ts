import { Column, Entity } from 'typeorm';

import { BaseIdEntity } from '@common/entities';

@Entity('toss_data')
export class TossDataEntity extends BaseIdEntity {
  constructor(attrs?: Partial<TossDataEntity>) {
    super(attrs);
    if (!attrs) {
      return;
    }

    this.paymentKey = attrs.paymentKey;
    this.secret = attrs.secret;
    this.orderId = attrs.orderId;
  }

  @Column({ unique: true })
  paymentKey: string;
  @Column({ nullable: true })
  secret: string;
  @Column()
  orderId: string;
}
