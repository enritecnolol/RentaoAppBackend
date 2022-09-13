import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { CustomerService } from '../../customer/service/customer.service';
import { HostCarService } from '../../host-car/service/host-car.service';
import { HostService } from '../../host/service/host.service';
import { CreateBookingDTO } from '../repository/booking.dto';
import { Booking, BookingStatus } from '../repository/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private customerService: CustomerService,
    private hostService: HostService,
    private hostCarService: HostCarService,
  ) {}

  carHaveBookingOnThisDates(
    hostCarid: number,
    pickupDate: string,
    returnDate: string,
  ) {
    return this.bookingRepository.find({
      where: {
        hostCar: {
          id: hostCarid,
        },
        bookingStatus: BookingStatus.PENDING,
        pickupDate: Between(new Date(pickupDate), new Date(returnDate)),
        returnDate: Between(new Date(pickupDate), new Date(returnDate)),
      },
    });
  }

  daysBetweenDates(startDate: string, endDate: string): number {
    const diffInMs =
      new Date(endDate).valueOf() - new Date(startDate).valueOf();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.round(diffInDays);
  }

  async create(data: CreateBookingDTO): Promise<Booking> {
    try {
      const host = await this.hostService.findById(data.hostId);
      const hostCar = await this.hostCarService.findById(data.hostCarId);

      if (hostCar.host.id !== data.hostId) {
        throw new HttpException('the host does not own this car', 400);
      }

      const isCarAvailable = await this.carHaveBookingOnThisDates(
        data.hostCarId,
        data.pickupDate,
        data.returnDate,
      );

      if (isCarAvailable.length > 0) {
        throw new HttpException(
          'The car is not available for these dates',
          400,
        );
      }

      const bookingDTO = this.bookingRepository.create({
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
      });
      const totalDays = this.daysBetweenDates(data.pickupDate, data.returnDate);

      bookingDTO.customer = await this.customerService.findById(
        data.customerId,
        false,
      );
      bookingDTO.host = host;
      bookingDTO.hostCar = hostCar;
      bookingDTO.dayPrice = hostCar.dayPrice;
      bookingDTO.totalDays = totalDays;
      bookingDTO.totalAmount = totalDays * hostCar.dayPrice;

      return await this.bookingRepository.save(bookingDTO);
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async cancel(bookingId: number, cancelDescription: string) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: {
          id: bookingId,
        },
      });

      if (!booking) {
        throw new HttpException('booking not found', 400);
      }

      return await this.bookingRepository.save({
        id: bookingId,
        bookingStatus: BookingStatus.CANCELLED,
        cancelDescription: cancelDescription,
      });
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getMyBookings(
    options: FindManyOptions<Booking> = {},
  ): Promise<Booking[]> {
    return await this.bookingRepository.find({
      ...options,
    });
  }

  async findById(id: number): Promise<any> {
    return await this.bookingRepository.findOne({
      where: {
        id,
      },
      relations: ['hostCar'],
    });
  }
}
