import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateCarAvailability } from '../../car-availability/repository/car-availability.dto';
import { CreateHostCarDTO, UpdateHostCarDTO } from '../repository/host-car.dto';
import { HostCarService } from '../service/host-car.service';

@Controller('api/v1/host-car')
export class HostCarController {
  constructor(private hostCarService: HostCarService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() hostCar: CreateHostCarDTO) {
    return this.hostCarService.create(hostCar);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Body() options) {
    return this.hostCarService.findAll(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  findAllAvailable(@Body() options) {
    return this.hostCarService.findAllAvailable(options);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostCarService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() hostCar: UpdateHostCarDTO) {
    return this.hostCarService.update({
      id: +id,
      ...hostCar,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/availability')
  updateAvailability(@Param('id') id: string, @Body() carAvailability) {
    return this.hostCarService.updateAvailability(+id, carAvailability);
  }
}
