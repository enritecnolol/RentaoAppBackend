import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDTO {
  @IsDateString()
  pickupDate: string;
  @IsDateString()
  returnDate: string;
  @IsNumber()
  hostId: number;
  @IsNumber()
  hostCarId: number;
  @IsNumber()
  customerId: number;
}
export class UpdateBookingDTO {}
