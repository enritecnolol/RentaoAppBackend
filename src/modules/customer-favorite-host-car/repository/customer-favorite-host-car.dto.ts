import { IsNumber } from 'class-validator';

export class CreateCustomerFavoriteHostCarDTO {
  @IsNumber()
  hostCarId: number;
  @IsNumber()
  customerId: number;
}
