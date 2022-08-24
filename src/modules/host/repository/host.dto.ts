import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHostDTO {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  identification?: string;
  @IsString()
  @IsOptional()
  nationality?: string;
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  postalCode?: string;
}
export class UpdateHostDTO {
  @IsNumber()
  id?: number;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  identification?: string;
  @IsString()
  @IsOptional()
  nationality?: string;
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @IsString()
  @IsOptional()
  address?: string;
  @IsString()
  @IsOptional()
  city?: string;
  @IsString()
  @IsOptional()
  postalCode?: string;
  @IsBoolean()
  @IsOptional()
  profileCompleted?: boolean;
}
