import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCarAvailability {
  @IsString()
  @IsOptional()
  currentStatus?: string;
  @IsDateString()
  @IsOptional()
  startDate?: string;
  @IsDateString()
  @IsOptional()
  endDate?: string;
  @IsString()
  @IsOptional()
  parkingDetails?: string;
}

export class UpdateCarAvailability extends PartialType(CreateCarAvailability) {
  @IsNumber()
  id: number;
}
