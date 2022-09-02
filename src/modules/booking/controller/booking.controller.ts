import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateBookingDTO } from '../repository/booking.dto';
import { BookingService } from '../service/booking.service';

@Controller('api/v1/booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() bookingDate: CreateBookingDTO) {
    return this.bookingService.create(bookingDate);
  }
}
