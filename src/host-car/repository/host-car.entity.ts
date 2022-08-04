import { Booking } from 'src/booking/repository/booking.entity';
import { CarAvailability } from 'src/car-availability/repository/car-availability.entity';
import { Host } from 'src/host/repository/host.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class HostCar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  trim: string;

  @Column()
  style: string;

  @Column()
  transmission: string;

  @Column()
  color: string;

  @Column()
  insurence: string;

  @Column()
  licensePlateNo: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  postalCode: string;

  @Column()
  dayPrice: number;

  @ManyToOne(() => Host, (host) => host.hostCars, {
    onDelete: 'CASCADE',
  })
  host: Host;

  @OneToMany(() => Booking, (booking) => booking.host, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  bookings: Booking[];

  @OneToOne(
    () => CarAvailability,
    (CarAvailability) => CarAvailability.hostCar,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  carAvailability: CarAvailability;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
