import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/modules/booking/repository/booking.entity';
import { CustomerController } from './controller/customer.controller';
import { Customer } from './repository/customer.entity';
import { CustomerSubscriber } from './repository/customer.subscriber';
import { CustomerService } from './service/customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Booking])],
  providers: [CustomerService, CustomerSubscriber],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class customerModule {}
