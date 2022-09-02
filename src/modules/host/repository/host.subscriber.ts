import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { HostService } from '../service/host.service';
import { Host } from './host.entity';

@EventSubscriber()
export class HostSubscriber implements EntitySubscriberInterface<Host> {
  constructor(dataSource: DataSource, private hostService: HostService) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Host;
  }

  async afterUpdate(event: UpdateEvent<Host>) {
    const hostData = await this.hostService.findById(event.entity.id);
    if (!hostData.profileCompleted) {
      if (
        hostData.dateOfBirth &&
        hostData.phoneNumber &&
        hostData.address &&
        hostData.city &&
        hostData.postalCode &&
        hostData.identification
      ) {
        this.hostService.update({
          id: event.entity.id,
          profileCompleted: true,
        });
      }
    }
  }
}
