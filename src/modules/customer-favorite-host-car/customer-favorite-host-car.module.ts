import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerModule } from '../customer/customer.module';
import { Customer } from '../customer/repository/customer.entity';
import { HostCarModule } from '../host-car/host-car.module';
import { HostCar } from '../host-car/repository/host-car.entity';
import { CustomerFavoriteHostCarController } from './controller/customer-favorite-host-car.controller';
import { CustomerFavoriteHostCar } from './repository/customer-favorite-host-car.entity';
import { CustomerFavoriteHostCarService } from './service/customer-favorite-host-car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerFavoriteHostCar, HostCar, Customer]),
    HostCarModule,
    customerModule,
  ],
  providers: [CustomerFavoriteHostCarService],
  controllers: [CustomerFavoriteHostCarController],
  exports: [CustomerFavoriteHostCarService],
})
export class CustomerFavoriteHostCarModule {}
