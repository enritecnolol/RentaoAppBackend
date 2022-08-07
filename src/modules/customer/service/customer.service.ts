import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDTO } from '../repository/customer.dto';
import { Customer } from '../repository/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(customer: CreateCustomerDTO): Promise<Customer> {
    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw new HttpException('there was an error: host-create', 400);
    }
  }

  async findByEmail(email: string): Promise<Customer> {
    try {
      return await this.customerRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new HttpException('there was an error: host-findByEmail', 400);
    }
  }
}
