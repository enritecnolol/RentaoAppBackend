import { Billing } from 'src/billing/repository/billing.entity';
import { Customer } from 'src/customer/repository/customer.entity';
import { HostCar } from 'src/host-car/repository/host-car.entity';
import { Host } from 'src/host/repository/host.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';

export enum BookingStatus {
  PENDING,
  INITIATED,
  COMPLETED,
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  pickupDate: string;

  @Column({ type: 'date' })
  returnDate: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  bookingStatus: BookingStatus;

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

  @OneToOne(() => Billing, (billing) => billing.booking, {
    onDelete: 'CASCADE',
  })
  billing: Billing;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
