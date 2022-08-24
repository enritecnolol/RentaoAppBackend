import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '../repository/customer.dto';
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
      throw new HttpException('there was an error: customer-create', 400);
    }
  }

  async findByEmail(email: string): Promise<Customer> {
    try {
      return await this.customerRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new HttpException('there was an error: customer-findByEmail', 400);
    }
  }

  async findById(id: number): Promise<Customer> {
    try {
      return await this.customerRepository.findOne({
        where: {
          id,
        },
        loadRelationIds: true,
      });
    } catch (error) {
      throw new HttpException('there was an error: customer-findById', 400);
    }
  }

  async update(customer: UpdateCustomerDTO): Promise<Customer> {
    return await this.customerRepository.save(customer, { reload: true });
  }
}
