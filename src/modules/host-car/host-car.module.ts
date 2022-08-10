import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/modules/booking/repository/booking.entity';
import { Host } from 'src/modules/host/repository/host.entity';
import { HostModule } from '../host/host.module';
import { HostCarController } from './controller/host-car.controller';
import { HostCar } from './repository/host-car.entity';
import { HostCarService } from './service/host-car.service';

@Module({
  imports: [TypeOrmModule.forFeature([HostCar, Host, Booking]), HostModule],
  providers: [HostCarService],
  controllers: [HostCarController],
  exports: [HostCarService],
})
export class HostCarModule {}
