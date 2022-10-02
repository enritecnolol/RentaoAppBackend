import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateCustomerFavoriteHostCarDTO } from '../repository/customer-favorite-host-car.dto';
import { CustomerFavoriteHostCarService } from '../service/customer-favorite-host-car.service';

@Controller('api/v1/favorite-host-car')
export class CustomerFavoriteHostCarController {
  constructor(private favoriteHostCarService: CustomerFavoriteHostCarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() favoriteHostCar: CreateCustomerFavoriteHostCarDTO) {
    return this.favoriteHostCarService.create(favoriteHostCar);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:customerId')
  getFavoriteHostCarByCustomer(
    @Param('customerId') customerId: string,
    @Query() query,
  ) {
    return this.favoriteHostCarService.findByCustomer(+customerId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeFavoriteHostCar(@Param('id') id: string) {
    return this.favoriteHostCarService.delete(+id);
  }
}
