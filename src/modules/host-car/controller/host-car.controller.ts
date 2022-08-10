import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
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
}
