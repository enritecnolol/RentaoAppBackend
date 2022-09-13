import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CancelBookingDTO, CreateBookingDTO } from '../repository/booking.dto';
import { BookingService } from '../service/booking.service';

@Controller('api/v1/booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() bookingDate: CreateBookingDTO) {
    return this.bookingService.create(bookingDate);
  }

  @Delete(':id/cancel')
  @UseGuards(JwtAuthGuard)
  cancelBooking(@Param('id') id: string, @Body() bodyData: CancelBookingDTO) {
    return this.bookingService.cancel(+id, bodyData.cancelDescription);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getMyBookings(@Body() options) {
    return this.bookingService.getMyBookings(options);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.bookingService.findById(+id);
  }
}
