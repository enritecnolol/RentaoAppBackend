import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateHostCarDTO, UpdateHostCarDTO } from '../repository/host-car.dto';
import { HostCarService } from '../service/host-car.service';

@Controller('api/v1/host-car')
export class HostCarController {
  constructor(private hostCarService: HostCarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() hostCar: CreateHostCarDTO) {
    return this.hostCarService.create(hostCar);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Body() options) {
    return this.hostCarService.findAll(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  findAllAvailable(@Body() options) {
    let bookingDates = {};
    if (options.pickupDate && options.returnDate) {
      bookingDates = {
        pickupDate: options.pickupDate,
        returnDate: options.returnDate,
      };
      delete options.pickupDate;
      delete options.returnDate;
    }
    return this.hostCarService.findAllAvailable(options, bookingDates);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostCarService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() hostCar: UpdateHostCarDTO) {
    return this.hostCarService.update({
      id: +id,
      ...hostCar,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/availability')
  updateAvailability(@Param('id') id: string, @Body() carAvailability) {
    return this.hostCarService.updateAvailability(+id, carAvailability);
  }
}
