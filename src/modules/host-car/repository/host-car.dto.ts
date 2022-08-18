import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHostCarDTO {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  trim: string;

  @IsString()
  style: string;

  @IsString()
  transmission: string;

  @IsString()
  color: string;

  @IsString()
  insurence: string;

  @IsString()
  licensePlateNo: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  postalCode: string;

  @IsNumber()
  dayPrice: number;

  @IsNumber()
  hostId: number;

  @IsString()
  @IsOptional()
  description: string;
}
export class UpdateHostCarDTO {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  trim: string;

  @IsString()
  @IsOptional()
  style: string;

  @IsString()
  @IsOptional()
  transmission: string;

  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  insurence: string;

  @IsString()
  @IsOptional()
  licensePlateNo: string;

  @IsString()
  @IsOptional()
  latitude: string;

  @IsString()
  @IsOptional()
  longitude: string;

  @IsString()
  @IsOptional()
  postalCode: string;

  @IsNumber()
  @IsOptional()
  dayPrice: number;

  @IsBoolean()
  @IsOptional()
  validated: boolean;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
