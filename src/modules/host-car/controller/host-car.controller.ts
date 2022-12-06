import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  findAll(@Body() options, @Query() query) {
    return this.hostCarService.findAll(options, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  findAllAvailable(@Body() options, @Query() query) {
    let bookingDates = {};
    let latitudeAndLongitude = {};
    if (options.pickupDate && options.returnDate) {
      bookingDates = {
        pickupDate: options.pickupDate,
        returnDate: options.returnDate,
      };
      delete options.pickupDate;
      delete options.returnDate;
    }
    if (options.latitude && options.longitude) {
      latitudeAndLongitude = {
        latitude: options.latitude,
        longitude: options.longitude,
      };
      delete options.latitude;
      delete options.longitude;
    }
    return this.hostCarService.findAllAvailable(
      options,
      bookingDates,
      latitudeAndLongitude,
      query,
    );
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

  @Get(':id/bookings')
  @UseGuards(JwtAuthGuard)
  getBookingByHostCar(@Param('id') id: string) {
    return this.hostCarService.getBookingByHostCar(+id);
  }
}
