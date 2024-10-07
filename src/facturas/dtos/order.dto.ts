import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsEnum,
  ValidateNested,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { STATUS } from 'src/enums/status-order.enum';

export class OrderDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  userId: string;

  @IsDate()
  @Type(() => Date)
  date_order: Date;

  @IsEnum(STATUS)
  status: STATUS;

  @IsBoolean()
  paid: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Detail)
  details: Detail[];

  @IsString()
  totalAmount: string;
}

class Detail {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  price: string; // Aquí se podría transformar a un número si se necesita

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Img)
  img: Img[];

  @IsString()
  totalPrice: string; // Igual que con price, podría ser un número
}

class Img {
  @IsUrl()
  url: string;

  @IsString()
  alt: string;

  @IsString()
  state_image: string;
}
