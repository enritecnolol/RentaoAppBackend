import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './modules/config-module/config-service/config.service';
import { ConfigurationModule } from './modules/config-module/config.module';
import { HttpExceptionFilter } from 'http-exception.filter';
import { HostModule } from './modules/host/host.module';
import { customerModule } from './modules/customer/customer.module';
import { HostCarModule } from './modules/host-car/host-car.module';
import { BookingModule } from './modules/booking/booking.module';
import { CarAvailabilityModule } from './modules/car-availability/car-availability.module';
import { AuthModule } from './modules/auth/auth.module';

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
    CarAvailabilityModule,
    AuthModule,
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
