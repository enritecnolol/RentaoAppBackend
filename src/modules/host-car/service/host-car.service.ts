import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UpdateCarAvailability } from '../../car-availability/repository/car-availability.dto';
import { currentStatus } from '../../car-availability/repository/car-availability.entity';
import { CarAvailabilityService } from '../../car-availability/service/car-availability.service';
import { HostService } from '../../host/service/host.service';
import { CreateHostCarDTO, UpdateHostCarDTO } from '../repository/host-car.dto';
import { HostCar } from '../repository/host-car.entity';
import * as _ from 'lodash';

@Injectable()
export class HostCarService {
  constructor(
    @InjectRepository(HostCar)
    private hostCarRepository: Repository<HostCar>,
    private hostService: HostService,
    private carAvailabilityService: CarAvailabilityService,
  ) {}

  async create(hostCar: CreateHostCarDTO): Promise<HostCar> {
    try {
      const hostCarDTO = await this.hostCarRepository.create(hostCar);
      hostCarDTO.host = await this.hostService.findById(hostCar.hostId);
      hostCarDTO.carAvailability = await this.carAvailabilityService.create({});
      const hostData = await this.hostCarRepository.save(hostCarDTO);
      return hostData;
    } catch (error) {
      throw new HttpException('there was an error: hostCar-create', 400);
    }
  }

  async findById(id: number): Promise<HostCar> {
    try {
      return await this.hostCarRepository.findOne({
        where: {
          id,
        },
        relations: ['host', 'carAvailability'],
      });
    } catch (error) {
      throw new HttpException('there was an error: hostCar-findById', 400);
    }
  }

  async update(hostCar: UpdateHostCarDTO): Promise<HostCar> {
    try {
      return await this.hostCarRepository.save(hostCar);
    } catch (error) {
      console.log(error);
      throw new HttpException('there was an error: hostCar-update', 400);
    }
  }
  async updateAvailability(
    hostCarId: number,
    carAvailability: UpdateCarAvailability,
  ): Promise<any> {
    try {
      const hostCar = await this.hostCarRepository.findOne({
        where: {
          id: hostCarId,
        },
        relations: ['carAvailability'],
      });
      return await this.carAvailabilityService.update({
        id: hostCar.carAvailability.id,
        ...carAvailability,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('there was an error: hostCar-update', 400);
    }
  }

  async findAll(options: FindManyOptions<HostCar> = {}): Promise<HostCar[]> {
    return await this.hostCarRepository.find({
      ...options,
    });
  }

  async findAllAvailable(
    options: FindManyOptions<HostCar> = {},
  ): Promise<HostCar[]> {
    const whereObject = {
      where: {
        carAvailability: {
          currentStatus: currentStatus.AVAILABLE,
        },
        validated: true,
        active: true,
      },
    };
    const findOption = _.merge(whereObject, options);
    return await this.hostCarRepository.find(findOption);
  }
}
