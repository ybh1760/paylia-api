import { IsString } from 'class-validator';

export class FailOrderBody {
  @IsString()
  reason: string;
}
