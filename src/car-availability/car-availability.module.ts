import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarAvailability } from './repository/car-availability.entity';
import { HostCar } from 'src/host-car/repository/host-car.entity';
import { CarAvailabilityService } from './service/car-availability.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarAvailability, HostCar])],
  providers: [CarAvailabilityService],
  exports: [CarAvailabilityService],
})
export class carAvailabilityModule {}
