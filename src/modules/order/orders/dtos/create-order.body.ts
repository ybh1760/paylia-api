import { IsNumber } from 'class-validator';

export class CreateOrderBody {
  @IsNumber()
  itemId: number;
}
