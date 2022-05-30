import { Module } from '@nestjs/common';

import { ItemModule } from '@item/item.module';
import { MysqlDatabaseProviderModule } from '@providers/database/mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MysqlDatabaseProviderModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
