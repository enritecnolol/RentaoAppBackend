import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'express';
import { access, mkdir } from 'fs/promises';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HostCarModule } from '../host-car/host-car.module';
import { HostCar } from '../host-car/repository/host-car.entity';
import { FileUploadController } from './controller/file-upload.controller';
import { FileHostCar } from './repository/file-host-car.entity';
import { FileUploadService } from './service/file-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileHostCar, HostCar]),
    HostCarModule,
    MulterModule.registerAsync({
      useFactory: () => {
        const storage = diskStorage({
          destination: async (req: Request, _: Express.Multer.File, cb) => {
            const { id } = req.params;
            const newDestination = ['./files/cars', id].join('/');
            try {
              await access(newDestination);
            } catch (e) {
              await mkdir(newDestination, { recursive: true });
            }

            cb(null, newDestination);
          },
          filename: (req: Request, file, cb) => {
            const newName = `${new Date().getTime().toString()}_Original_${
              file.originalname
            }`;
            cb(null, newName);
          },
        });

        return {
          storage: storage,
        };
      },
    }),
  ],
  providers: [FileUploadService],
  exports: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
