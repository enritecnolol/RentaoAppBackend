import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageSizesEnum } from '../../../types';
import { HostCar } from '../../host-car/repository/host-car.entity';

@Entity()
export class FileHostCar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filePath: string;

  @Column()
  name: string;

  @Column()
  size: ImageSizesEnum;

  @Column({ nullable: true })
  index: number;

  @ManyToOne(() => HostCar, (hostCar) => hostCar.fileHostCar, {
    onDelete: 'CASCADE',
  })
  hostCar: HostCar;
}
