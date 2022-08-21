import { Booking } from 'src/modules/booking/repository/booking.entity';
import { CarAvailability } from 'src/modules/car-availability/repository/car-availability.entity';
import { Host } from 'src/modules/host/repository/host.entity';
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
import { FileHostCar } from '../../file-upload/repository/file-host-car.entity';

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

  @Column({ nullable: true })
  description: string;

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
      cascade: true,
      eager: true,
    },
  )
  carAvailability: CarAvailability;

  @OneToMany(() => FileHostCar, (fileHostCar) => fileHostCar.hostCar, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  fileHostCar: FileHostCar[];

  @Column({ default: false })
  validated: boolean;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
