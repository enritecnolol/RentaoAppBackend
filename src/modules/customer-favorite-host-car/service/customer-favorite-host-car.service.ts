import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataPaginate, paginate, Query } from '../../../util/pagination';
import { CustomerService } from '../../customer/service/customer.service';
import { HostCarService } from '../../host-car/service/host-car.service';
import { CustomerFavoriteHostCar } from '../repository/customer-favorite-host-car.entity';
import * as _ from 'lodash';

@Injectable()
export class CustomerFavoriteHostCarService {
  constructor(
    @InjectRepository(CustomerFavoriteHostCar)
    private favoriteHostCarRepository: Repository<CustomerFavoriteHostCar>,
    private hostCarService: HostCarService,
    private customerService: CustomerService,
  ) {}

  async create({ hostCarId, customerId }): Promise<CustomerFavoriteHostCar> {
    const favoriteHostCarDTO = await this.favoriteHostCarRepository.create();
    favoriteHostCarDTO.hostCar = await this.hostCarService.findById(
      hostCarId,
      [],
    );
    favoriteHostCarDTO.customer = await this.customerService.findById(
      customerId,
      false,
    );
    const result = await this.favoriteHostCarRepository.save(
      favoriteHostCarDTO,
    );
    return result;
  }

  async delete(id: number): Promise<CustomerFavoriteHostCar> {
    const customerFavoriteHostCar =
      await this.favoriteHostCarRepository.findOne({
        where: {
          id: id,
        },
      });
    const result = await this.favoriteHostCarRepository.remove(
      customerFavoriteHostCar,
    );
    return result;
  }

  async findByCustomer(
    customerId: number,
    query: Query = {},
  ): Promise<CustomerFavoriteHostCar[] | DataPaginate> {
    const result = await this.favoriteHostCarRepository.findAndCount({
      where: {
        customer: {
          id: customerId,
        },
      },
      relations: ['hostCar', 'hostCar.fileHostCar'],
    });

    if (!_.isEmpty(query)) {
      const { limit, page } = query;
      return paginate(result, limit, page);
    }

    return result[0];
  }
}
