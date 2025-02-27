import { Type } from 'class-transformer';

import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';

export class Direccion {
  @IsString()
  city: string;
  @IsString()
  zip: string;
  @IsString()
  address: string;
  @IsString()
  @IsOptional()
  address2?: string;
}
export class UserDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  telefono: string;
  @ValidateNested()
  @Type(() => Direccion)
  direccion: Direccion;
}
