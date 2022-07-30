import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HostCar } from '../repository/host-car.entity';

@Injectable()
export class HostCarService {
  constructor(
    @InjectRepository(HostCar)
    private hostCarRepository: Repository<HostCar>,
  ) {}
}
