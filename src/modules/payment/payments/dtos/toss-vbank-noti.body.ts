import { IsDate, IsString } from 'class-validator';

export class TossVbankNotiBody {
  @IsDate()
  createdAt: Date;
  @IsString()
  secret: string;
  @IsString()
  status: 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED';
  @IsString()
  orderId: string;
}
