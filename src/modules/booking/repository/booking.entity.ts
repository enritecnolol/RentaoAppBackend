import { Customer } from 'src/modules/customer/repository/customer.entity';
import { HostCar } from 'src/modules/host-car/repository/host-car.entity';
import { Host } from 'src/modules/host/repository/host.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum BookingStatus {
  PENDING = 'PENDING',
  INITIATED = 'INITIATED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  pickupDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column()
  dayPrice: number;

  @Column()
  totalDays: number;

  @Column()
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  bookingStatus: BookingStatus;

  @Column({ nullable: true })
  cancelDescription: string;

  @ManyToOne(() => Host, (host) => host.bookings, {
    onDelete: 'CASCADE',
  })
  host: Host;

  @ManyToOne(() => Customer, (customer) => customer.bookings, {
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @ManyToOne(() => HostCar, (hostCar) => hostCar.bookings, {
    onDelete: 'CASCADE',
  })
  hostCar: HostCar;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
