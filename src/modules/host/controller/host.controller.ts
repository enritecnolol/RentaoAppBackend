import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateHostDTO } from '../repository/host.dto';
import { HostService } from '../service/host.service';

@Controller('api/v1/host')
export class HostController {
  constructor(private hostService: HostService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() host: UpdateHostDTO) {
    return this.hostService.update({
      id: +id,
      ...host,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostService.findById(+id);
  }
}
