import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
        throw new HttpException('the host does not own this car', 500);
      }
      const bookingDTO = this.bookingRepository.create({
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
      });
      const totalDays = this.daysBetweenDates(data.pickupDate, data.returnDate);
      bookingDTO.customer = await this.customerService.findById(
        data.customerId,
      );
      bookingDTO.host = host;
      bookingDTO.hostCar = hostCar;
      bookingDTO.dayPrice = hostCar.dayPrice;
      bookingDTO.totalDays = totalDays;
      bookingDTO.totalAmount = totalDays * hostCar.dayPrice;

      return await this.bookingRepository.save(bookingDTO);
    } catch (error) {
      throw new HttpException('there was an error: Booking-create', 400);
    }
  }
}
