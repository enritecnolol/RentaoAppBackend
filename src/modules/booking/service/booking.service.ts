import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Booking, BookingStatus } from '../repository/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
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
}
