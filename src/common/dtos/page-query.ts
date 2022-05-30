import { IsNumber, IsOptional } from 'class-validator';

export class PageQuery {
  constructor(input?: Partial<PageQuery>) {
    if (!input) {
      return;
    }

    this.offset = input.offset;
    this.limit = input.limit;
  }

  @IsNumber()
  @IsOptional()
  offset: number;
  @IsNumber()
  @IsOptional()
  limit: number;

  get pageFilter() {
    if (this.offset === undefined || this.limit === undefined) {
      return null;
    }

    return {
      skip: this.offset,
      take: this.limit,
    };
  }
}
