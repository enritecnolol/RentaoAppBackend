import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from 'src/billing/repository/billing.entity';
import { Customer } from 'src/customer/repository/customer.entity';
import { HostCar } from 'src/host-car/repository/host-car.entity';
import { Host } from 'src/host/repository/host.entity';
import { BookingController } from './controller/booking.controller';
import { Booking } from './repository/booking.entity';
import { BookingService } from './service/booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Customer, HostCar, Billing, Host]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
