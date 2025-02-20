import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserDireccionDto {
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsInt()
  @IsPositive()
  postal: number;
}

export class UserDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsNumber()
  @IsPositive()
  telefono: number;
  @ValidateNested()
  @Type(() => UserDireccionDto)
  direccion: UserDireccionDto;
}
