import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { CustomerService } from '../service/customer.service';
import { Customer } from './customer.entity';

@EventSubscriber()
export class CustomerSubscriber implements EntitySubscriberInterface<Customer> {
  constructor(
    dataSource: DataSource,
    private customerService: CustomerService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Customer;
  }

  async afterUpdate(event: UpdateEvent<Customer>) {
    const customerData = await this.customerService.findById(event.entity.id);
    if (!customerData.profileCompleted) {
      if (
        customerData.dateOfBirth &&
        customerData.phoneNumber &&
        customerData.address &&
        customerData.city &&
        customerData.postalCode &&
        customerData.driverLicense
      ) {
        this.customerService.update({
          id: event.entity.id,
          profileCompleted: true,
        });
      }
    }
  }
}
