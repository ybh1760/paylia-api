import { Module } from '@nestjs/common';

import { MysqlDatabaseProviderModule } from '@providers/database/mysql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MysqlDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
