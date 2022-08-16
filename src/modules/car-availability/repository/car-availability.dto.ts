import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { currentStatus } from './car-availability.entity';

export class CreateCarAvailability {
  @IsEnum(currentStatus)
  @IsOptional()
  currentStatus?: currentStatus;
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
