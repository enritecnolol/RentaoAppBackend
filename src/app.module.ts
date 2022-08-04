import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './config-module/config-service/config.service';
import { ConfigurationModule } from './config-module/config.module';
import { HttpExceptionFilter } from 'http-exception.filter';
import { HostModule } from './host/host.module';
import { customerModule } from './customer/customer.module';
import { HostCarModule } from './host-car/host-car.module';
import { BookingModule } from './booking/booking.module';
import { carAvailabilityModule } from './car-availability/car-availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => ({
        ...configService.getDatabaseConnection(),
        autoLoadEntities: true,
      }),
      inject: [ConfigurationService],
    }),
    HostModule,
    customerModule,
    HostCarModule,
    BookingModule,
    carAvailabilityModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
    AppService,
  ],
})
export class AppModule {}
