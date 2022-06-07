import { IsEnum } from 'class-validator';

import { PayMethod } from '@payment/payments/constants';

export class StartOrderBody {
  @IsEnum(PayMethod)
  payMethod: PayMethod;
}
