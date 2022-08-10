import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HostService } from '../../host/service/host.service';
import { CreateHostCarDTO, UpdateHostCarDTO } from '../repository/host-car.dto';
import { HostCar } from '../repository/host-car.entity';

@Injectable()
export class HostCarService {
  constructor(
    @InjectRepository(HostCar)
    private hostCarRepository: Repository<HostCar>,
    private hostService: HostService,
  ) {}

  async create(hostCar: CreateHostCarDTO): Promise<HostCar> {
    try {
      const hostCarDTO = await this.hostCarRepository.create(hostCar);
      const host = await this.hostService.findById(hostCar.hostId);
      hostCarDTO.host = host;
      const hostData = await this.hostCarRepository.save(hostCarDTO);
      return hostData;
    } catch (error) {
      throw new HttpException('there was an error: hostCar-create', 400);
    }
  }

  async findById(id: number): Promise<HostCar> {
    try {
      return await this.hostCarRepository.findOne({
        where: {
          id,
        },
        relations: ['host'],
      });
    } catch (error) {
      throw new HttpException('there was an error: hostCar-findById', 400);
    }
  }

  async update(hostCar: UpdateHostCarDTO): Promise<HostCar> {
    try {
      return await this.hostCarRepository.save(hostCar, { reload: true });
    } catch (error) {
      throw new HttpException('there was an error: hostCar-update', 400);
    }
  }
}
