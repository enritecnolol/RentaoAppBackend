import { Booking } from 'src/booking/repository/booking.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  driverLicense: string;

  @Column({ type: 'date' })
  expiry: string;

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

  @Column()
  nationality: string;

  @OneToMany(() => Booking, (booking) => booking.customer, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  bookings: Booking[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
