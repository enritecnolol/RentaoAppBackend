import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UpdateCustomerDTO } from '../repository/customer.dto';
import { CustomerService } from '../service/customer.service';

@Controller('api/v1/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() customer: UpdateCustomerDTO) {
    return this.customerService.update({
      id: +id,
      ...customer,
    });
  }
}
