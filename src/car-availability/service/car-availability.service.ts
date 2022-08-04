import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarAvailability } from '../repository/car-availability.entity';

@Injectable()
export class CarAvailabilityService {
  constructor(
    @InjectRepository(CarAvailability)
    private carAvailabilityRepository: Repository<CarAvailability>,
  ) {}
}
