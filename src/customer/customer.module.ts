import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/booking/repository/booking.entity';
import { CustomerController } from './controller/customer.controller';
import { Customer } from './repository/customer.entity';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Booking])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class customerModule {}
