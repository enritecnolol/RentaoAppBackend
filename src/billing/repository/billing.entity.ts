import { Booking } from 'src/booking/repository/booking.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billingStatus: string;

  @Column({ type: 'date' })
  billingDate: string;

  @Column()
  dayPrice: number;

  @Column()
  days: number;

  @Column()
  lateFee: number;

  @Column()
  total: number;

  @OneToOne(() => Booking, (booking) => booking.billing, {
    onDelete: 'CASCADE',
  })
  booking: Booking;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
