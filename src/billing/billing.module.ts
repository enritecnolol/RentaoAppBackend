import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/booking/repository/booking.entity';
import { Billing } from './repository/billing.entity';
import { BillingService } from './service/billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, Booking])],
  providers: [BillingService],
  exports: [BillingService],
})
export class HostCarModule {}
