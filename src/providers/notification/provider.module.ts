import { Module } from '@nestjs/common';
import { NotificationProviderService } from './provider.service';

@Module({
  providers: [NotificationProviderService],
  exports: [NotificationProviderService],
})
export class NotificationProviderModule {}
