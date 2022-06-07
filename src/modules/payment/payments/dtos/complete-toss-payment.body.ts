import { IsNumber, IsString } from 'class-validator';

export class CompleteTossPaymentBody {
  @IsString()
  paymentKey: string;
  @IsString()
  merchantUid: string;
  @IsNumber()
  amount: number;
}
