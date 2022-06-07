import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { OrderEntity } from '@order/orders/domain';
import { ITossPayment } from './type';

@Injectable()
export class TossProviderService {
  private baseUrl = 'https://api.tosspayments.com/v1';
  private seckretKey = 'dGVzdF9za19qWjYxSk94UlFWRUtRMUw0ZzJSOFcwWDliQXF3Og==';

  constructor(private readonly httpService: HttpService) {}

  async approve(paymentKey: string, order: OrderEntity): Promise<ITossPayment> {
    const res = await firstValueFrom(
      this.httpService.post<ITossPayment>(
        this.baseUrl + `/payments/${paymentKey}`,
        {
          amount: order.paidAmount,
          orderId: order.merchantUid,
        },
        {
          headers: {
            Authorization: `Basic ${this.seckretKey}`,
          },
        },
      ),
    );

    return res.data;
  }
}
