import { ValidateNested } from 'class-validator';
import { OrderDto } from './order.dto';
import { UserDto } from './user.dto';
import { Type } from 'class-transformer';

export class DataDto {
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  user: UserDto;
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  order: OrderDto;
}
