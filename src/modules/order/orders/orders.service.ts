import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

import { OrderEntity } from './domain';
import { OrderRepository } from './repositories';
import { OrderStatus } from './constants';
import { FirstOrderLogsService } from './first-order-log.service';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class OrdersService {
  constructor(
    readonly repository: OrderRepository,
    private readonly firstOrderLogsService: FirstOrderLogsService,
  ) {}

  private async getMerchantUid(date = new Date()) {
    const prefix = dayjs(date).tz('Asia/Seoul').format('YYMMDDHHmmssSSS');

    let merchantUid: string;
    let num = 0;

    do {
      merchantUid = `${prefix}${num.toString().padStart(2, '0')}`;
      num++;
    } while (await this.repository.checkExist(merchantUid));

    return merchantUid;
  }

  async checkIsReorder(userId: number) {
    return await this.firstOrderLogsService.checkExist(userId);
  }

  async get(merchantUid: string, relations?: string[]) {
    return await this.repository.get(merchantUid, relations);
  }

  async create(input: Pick<OrderEntity, 'itemId' | 'userId' | 'amount'>) {
    const merchantUid = await this.getMerchantUid();

    const isReorder = await this.checkIsReorder(input.userId);

    return await this.repository.save(
      new OrderEntity({
        ...input,
        merchantUid,
        status: OrderStatus.Pending,
        discountAmount: isReorder ? input.amount * 0.5 : 0,
      }),
    );
  }

  async start(merchantUid: string, input: Pick<OrderEntity, 'payMethod'>) {
    const order = await this.get(merchantUid);
    order.markPaying(input.payMethod);

    return await this.repository.save(order);
  }

  async fail(merchantUid: string, reason: string) {
    const order = await this.get(merchantUid);
    order.markFailed(reason);

    return await this.repository.save(order);
  }

  async complete(merchantUid: string) {
    const order = await this.get(merchantUid);
    order.complete();

    await this.repository.save(order);
    const isReorder = await this.checkIsReorder(order.userId);
    if (!isReorder) {
      await this.firstOrderLogsService.create(order.userId);
    }
  }

  async confirmVbankPaid(merchantUid: string) {
    const order = await this.get(merchantUid);
    order.markPaid();

    await this.repository.save(order);
  }
}
