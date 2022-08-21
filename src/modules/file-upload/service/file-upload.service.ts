import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HostCarService } from '../../host-car/service/host-car.service';
import { FileHostCar } from '../repository/file-host-car.entity';
import * as sharp from 'sharp';
import { readFileSync } from 'fs';

const imageSizes = [
  {
    label: 'md',
    size: [720, 350],
  },
  {
    label: 'lg',
    size: [1440, 700],
  },
];

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileHostCar)
    private fileHostCarRepository: Repository<FileHostCar>,
    private hostCarService: HostCarService,
  ) {}
  async uploadFileHostCar(files: Express.Multer.File[], hostCarId: number) {
    const hostCar = await this.hostCarService.findById(hostCarId);
    const ListOfPathByImages = await Promise.all(
      await files.map(async (file) => {
        return await Promise.all(
          imageSizes.map(async (imageSize) => {
            const [width, height] = imageSize.size;
            const filename = file.originalname.replace(/\..+$/, '');
            const newFileName = `${filename}-${Date.now()}-${imageSize.label}-${
              imageSize.size[0]
            }x${imageSize.size[1]}.jpg`;
            const bufferImgOriginal = readFileSync(file.path);
            await sharp(bufferImgOriginal)
              .resize(width, height, {
                fit: 'contain',
              })
              .toFormat('jpg')
              .toFile(`${file.destination}/${newFileName}`);
            return `${file.destination}/${newFileName}`;
          }),
        );
      }),
    );
    const imagePathList = ListOfPathByImages.flat(1);

    await imagePathList.map(async (file) => {
      const fileHostCarDTO = await this.fileHostCarRepository.create({
        filePath: file,
        hostCar: hostCar,
      });
      await this.fileHostCarRepository.save(fileHostCarDTO);
    });

    return 'Images saved successfully';
  }
}
