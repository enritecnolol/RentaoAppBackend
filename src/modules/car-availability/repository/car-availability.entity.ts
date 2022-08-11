import { HostCar } from 'src/modules/host-car/repository/host-car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CarAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  currentStatus: string;

  @Column({ nullable: true, type: 'date' })
  startDate: string;

  @Column({ nullable: true, type: 'date' })
  endDate: string;

  @Column({ nullable: true })
  parkingDetails: string;

  @OneToOne(() => HostCar, (hostCar) => hostCar.carAvailability, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  hostCar: HostCar;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;
}
