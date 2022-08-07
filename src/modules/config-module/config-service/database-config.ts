import { ConnectionOptions } from 'typeorm';

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123456789',
  database: 'rent_car',
  synchronize: true,
};

export default databaseConfig;
