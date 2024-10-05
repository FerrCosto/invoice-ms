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
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsDate()
  @Type(() => Date)
  date_order: Date;

  @IsString()
  status: string;

  @IsBoolean()
  paid: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Detail)
  details: Detail[];
}

class Detail {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  price: string;

  @IsArray()
  @IsString({ each: true })
  name: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Img)
  img: Img[];

  @IsString()
  totalPrice: string;
}

class Img {
  @IsUrl()
  url: string;

  @IsString()
  alt: string;
  @IsString()
  state_image: string;
}
