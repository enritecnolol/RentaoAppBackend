import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import databaseConfig from './database-config';

Injectable();
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  getDatabaseConnection() {
    return databaseConfig;
  }

  getEnv<T>(key: string): T {
    return this.configService.get<T>(key);
  }
}
