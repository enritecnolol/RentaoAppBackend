import { Booking } from 'src/booking/repository/booking.entity';
import { Host } from 'src/host/repository/host.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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
  insurence: string;

  @Column()
  registration: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
