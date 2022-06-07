import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '@auth/decorators';
import { JwtPayload } from '@auth/domain';
import { VerifyGuard } from '@auth/guards';
import { ItemsService } from '@item/items/items.service';

import { CreateOrderBody, StartOrderBody } from './dtos';

import { OrdersService } from './orders.service';
import { FailOrderBody } from './dtos/fail-order.body';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
    private readonly itemsService: ItemsService,
  ) {}

  @UseGuards(VerifyGuard)
  @Post('/')
  async create(
    @Body() body: CreateOrderBody,
    @CurrentUser() { sub: userId }: JwtPayload,
  ) {
    const item = await this.itemsService.get(body.itemId);

    return await this.service.create({
      ...body,
      userId,
      amount: item.price,
    });
  }

  @UseGuards(VerifyGuard)
  @Get('/:merchantUid')
  async get(@Param('merchantUid') merchantUid: string) {
    return await this.service.get(merchantUid, ['user', 'item']);
  }

  @UseGuards(VerifyGuard)
  @Post('/:merchantUid/start')
  async start(
    @Param('merchantUid') merchantUid: string,
    @Body() body: StartOrderBody,
  ) {
    return await this.service.start(merchantUid, body);
  }

  @UseGuards(VerifyGuard)
  @Post('/:merchantUid/fail')
  async fail(
    @Param('merchantUid') merchantUid: string,
    @Body() body: FailOrderBody,
  ) {
    return await this.service.fail(merchantUid, body.reason);
  }
}
