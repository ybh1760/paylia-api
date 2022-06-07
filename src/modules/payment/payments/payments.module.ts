import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersModule } from '@order/orders/orders.module';
import { TossProviderModule } from '@providers/payment/toss/provider.module';
import { NotificationProviderModule } from '@providers/notification/provider.module';

import { PaymentRepository, TossDataRepository } from './repositories';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TossDatasService } from './toss-datas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, TossDataRepository]),
    OrdersModule,
    TossProviderModule,
    NotificationProviderModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, TossDatasService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
