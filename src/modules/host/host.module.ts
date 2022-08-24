import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/modules/booking/repository/booking.entity';
import { HostCar } from 'src/modules/host-car/repository/host-car.entity';
import { HostController } from './controller/host.controller';
import { Host } from './repository/host.entity';
import { HostSubscriber } from './repository/host.subscriber';
import { HostService } from './service/host.service';

@Module({
  imports: [TypeOrmModule.forFeature([Host, HostCar, Booking])],
  providers: [HostService, HostSubscriber],
  controllers: [HostController],
  exports: [HostService],
})
export class HostModule {}
