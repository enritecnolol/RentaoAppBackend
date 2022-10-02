import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customer/repository/customer.entity';
import { HostCar } from '../../host-car/repository/host-car.entity';

@Entity()
export class CustomerFavoriteHostCar {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.customerFavoriteHostCar, {
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @ManyToOne(() => HostCar, (hostCar) => hostCar.customerFavoriteHostCar, {
    onDelete: 'CASCADE',
  })
  hostCar: HostCar;
}
