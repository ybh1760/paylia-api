import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ItemEntity } from './domain';

import { ItemsService } from './items.service';

@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<ItemEntity> {
    return await this.itemsService.get(id);
  }
}
