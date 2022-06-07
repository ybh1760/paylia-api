import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsModule } from '@item/items/items.module';

import { FirstOrderLogRepository, OrderRepository } from './repositories';

import { OrdersController } from './orders.controller';
import { FirstOrderLogsService } from './first-order-log.service';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FirstOrderLogRepository, OrderRepository]),
    ItemsModule,
  ],
  controllers: [OrdersController],
  providers: [FirstOrderLogsService, OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
