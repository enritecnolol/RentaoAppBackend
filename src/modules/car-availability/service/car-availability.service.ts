import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCarAvailability,
  UpdateCarAvailability,
} from '../repository/car-availability.dto';
import { CarAvailability } from '../repository/car-availability.entity';

@Injectable()
export class CarAvailabilityService {
  constructor(
    @InjectRepository(CarAvailability)
    private carAvailabilityRepository: Repository<CarAvailability>,
  ) {}

  async create(
    carAvailability: CreateCarAvailability,
  ): Promise<CarAvailability> {
    try {
      return await this.carAvailabilityRepository.save({
        ...carAvailability,
      });
    } catch (error) {
      throw new HttpException(
        'there was an error: carAvailability-create',
        400,
      );
    }
  }

  async update(
    carAvailability: UpdateCarAvailability,
  ): Promise<CarAvailability> {
    try {
      return await this.carAvailabilityRepository.save(carAvailability);
    } catch (error) {
      throw new HttpException(
        'there was an error: carAvailability-create',
        400,
      );
    }
  }
}
