import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TossProviderService } from './provider.service';

@Module({
  imports: [HttpModule],
  providers: [TossProviderService],
  exports: [TossProviderService],
})
export class TossProviderModule {}
