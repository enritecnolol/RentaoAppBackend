import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDTO {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  driverLicense?: string;
  @IsDateString()
  @IsOptional()
  expiry?: string;
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
  @IsString()
  @IsOptional()
  nationality?: string;
}
export class UpdateCustomerDTO {
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
  driverLicense?: string;
  @IsDateString()
  @IsOptional()
  expiry?: string;
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
  @IsString()
  @IsOptional()
  nationality?: string;
}
