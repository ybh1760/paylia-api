import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '@auth/decorators';
import { JwtPayload } from '@auth/domain';
import { VerifyGuard } from '@auth/guards';
import { OrdersService } from '@order/orders/orders.service';
import { TossProviderService } from '@providers/payment/toss/provider.service';
import { NotificationProviderService } from '@providers/notification/provider.service';

import { CompleteTossPaymentBody, TossVbankNotiBody } from './dtos';
import { PaymentsService } from './payments.service';
import { TossDatasService } from './toss-datas.service';
import { PayMethod } from './constants';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly service: PaymentsService,
    private readonly ordersService: OrdersService,
    private readonly tossDatasService: TossDatasService,
    private readonly tossProviderService: TossProviderService,
    private readonly notificationService: NotificationProviderService,
  ) {}

  @UseGuards(VerifyGuard)
  @Post('/toss/complete')
  async completeTossPayment(
    @CurrentUser() { sub: userId }: JwtPayload,
    @Body() body: CompleteTossPaymentBody,
  ) {
    const order = await this.ordersService.get(body.merchantUid);

    if (order.paidAmount !== body.amount) {
      throw new BadRequestException('결제금액이 맞지 않습니다.');
    }

    const { secret, paymentKey, virtualAccount } =
      await this.tossProviderService.approve(body.paymentKey, order);

    const { id: tossDataId } = await this.tossDatasService.create({
      secret,
      paymentKey,
      orderId: order.merchantUid,
    });
    const payment = await this.service.create({
      userId,
      tossDataId,
      amount: order.paidAmount,
      payMethod: order.payMethod,
      vbank: virtualAccount?.bank,
      vbankDueDate: virtualAccount?.dueDate,
      vbankNum: virtualAccount?.accountNumber,
    });

    if (payment.payMethod === PayMethod.Vbank) {
      await this.notificationService.sendVbankNoti(payment);
    }

    await this.ordersService.complete(order.merchantUid);
  }

  @Post('/toss/vbank-noti')
  async acceptTossVbankNoti(@Body() body: TossVbankNotiBody) {
    const { orderId } = await this.tossDatasService.findOne({
      secret: body.secret,
    });

    await this.ordersService.confirmVbankPaid(orderId);
  }
}
