import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { UpdateCarAvailability } from '../../car-availability/repository/car-availability.dto';
import { currentStatus } from '../../car-availability/repository/car-availability.entity';
import { CarAvailabilityService } from '../../car-availability/service/car-availability.service';
import { HostService } from '../../host/service/host.service';
import { CreateHostCarDTO, UpdateHostCarDTO } from '../repository/host-car.dto';
import { HostCar } from '../repository/host-car.entity';
import * as _ from 'lodash';
import { BookingService } from '../../booking/service/booking.service';

type BookingDates = {
  pickupDate?: string;
  returnDate?: string;
};
@Injectable()
export class HostCarService {
  constructor(
    @InjectRepository(HostCar)
    private hostCarRepository: Repository<HostCar>,
    private hostService: HostService,
    private carAvailabilityService: CarAvailabilityService,
    private bookingService: BookingService,
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
    bookingDates: BookingDates = {},
  ): Promise<HostCar[]> {
    const whereObject = {
      where: {
        carAvailability: {
          currentStatus: Not(currentStatus.OUT_OF_SERVICE),
        },
        validated: true,
        active: true,
      },
      relations: ['carAvailability'],
    };
    const findOption = _.merge(whereObject, options);
    let carList = await this.hostCarRepository.find(findOption);
    if (bookingDates.pickupDate && bookingDates.returnDate) {
      carList = carList.filter(async (car) => {
        const carBookings = await this.bookingService.carHaveBookingOnThisDates(
          car.id,
          bookingDates.pickupDate,
          bookingDates.returnDate,
        );
        return carBookings.length === 0;
      });
    }
    return carList;
  }
}
