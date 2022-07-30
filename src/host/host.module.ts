import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/booking/repository/booking.entity';
import { HostCar } from 'src/host-car/repository/host-car.entity';
import { HostController } from './controller/host.controller';
import { Host } from './repository/host.entity';
import { HostService } from './service/host.service';

@Module({
  imports: [TypeOrmModule.forFeature([Host, HostCar, Booking])],
  providers: [HostService],
  controllers: [HostController],
  exports: [HostService],
})
export class HostModule {}
