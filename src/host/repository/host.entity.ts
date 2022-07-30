import { Booking } from 'src/booking/repository/booking.entity';
import { HostCar } from 'src/host-car/repository/host-car.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Host {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  identification: string;

  @Column()
  nationality: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @OneToMany(() => HostCar, (hostCar) => hostCar.host, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  hostCars: HostCar[];

  @OneToMany(() => Booking, (booking) => booking.host, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  bookings: Booking[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
