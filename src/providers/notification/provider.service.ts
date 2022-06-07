import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

import { PaymentEntity } from '@payment/payments/domain';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class NotificationProviderService {
  async sendVbankNoti(payment: PaymentEntity) {
    console.log(`안녕하세요! 가상계좌로 입금해주시면 주문이 완료됩니다.
  [가상계좌 입금정보]
  ▶ 입금계좌 : ${payment.vbank} ${payment.vbankNum}
  ▶ 예금주 : ${payment.user.id}
  ▶ 입금액 : ${payment.amount}원
  ▶ 입금기한: ${dayjs
    .tz(payment.vbankDueDate, 'Asia/Seoul')
    .format('YYYY년 MM월 DD일 HH:mm')}까지`);
  }
}
