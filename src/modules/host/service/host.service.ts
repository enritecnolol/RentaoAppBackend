import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHostDTO, UpdateHostDTO } from '../repository/host.dto';
import { Host } from '../repository/host.entity';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(Host)
    private hostRepository: Repository<Host>,
  ) {}

  async create(host: CreateHostDTO): Promise<Host> {
    try {
      return await this.hostRepository.save(host);
    } catch (error) {
      throw new HttpException('there was an error: host-create', 400);
    }
  }

  async findByEmail(email: string): Promise<Host> {
    try {
      return await this.hostRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new HttpException('there was an error: host-findByEmail', 400);
    }
  }

  async findById(id: number): Promise<Host> {
    try {
      return await this.hostRepository.findOne({
        where: {
          id,
        },
        loadRelationIds: true,
      });
    } catch (error) {
      throw new HttpException('there was an error: host-findById', 400);
    }
  }

  async update(host: UpdateHostDTO): Promise<Host> {
    return this.hostRepository.save(host, { reload: true });
  }
}
