import { Booking } from 'src/modules/booking/repository/booking.entity';
import { HostCar } from 'src/modules/host-car/repository/host-car.entity';
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

  @Column({ unique: true, nullable: true })
  identification: string;

  @Column({ nullable: true })
  identificationImg: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ default: false })
  profileCompleted: boolean;

  @Column({ nullable: true })
  profileImg: string;

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
