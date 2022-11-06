import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HostCarService } from '../../host-car/service/host-car.service';
import { FileHostCar } from '../repository/file-host-car.entity';
import * as sharp from 'sharp';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { TokenUser } from '../../../types';
import { HostService } from '../../host/service/host.service';
import { CustomerService } from '../../customer/service/customer.service';

const imageSizes = [
  {
    label: 'sm',
    size: [180, 180],
  },
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
    private hostService: HostService,
    private customerService: CustomerService,
  ) {}

  async uploadFileHostCar(files: Express.Multer.File[], hostCarId: number) {
    const hostCar = await this.hostCarService.findById(hostCarId);
    if (!hostCar) {
      throw new HttpException('This host car does not exist', 400);
    }
    const filename = uuidv4();
    const ListOfPathByImages = await Promise.all(
      await files.map(async (file) => {
        return await Promise.all(
          imageSizes.map(async (imageSize) => {
            const [width, height] = imageSize.size;
            const newFileName = `${filename}-${imageSize.label}-${imageSize.size[0]}x${imageSize.size[1]}.jpg`;
            const bufferImgOriginal = readFileSync(file.path);
            await this.StorageImg(
              bufferImgOriginal,
              width,
              height,
              file.destination,
              newFileName,
            );
            return {
              path: `${file.destination}/${newFileName}`,
              fileName: newFileName,
              size: imageSize.label,
            };
          }),
        );
      }),
    );
    const imagePathList = ListOfPathByImages.flat(1);

    await imagePathList.map(async (file) => {
      const fileHostCarDTO = await this.fileHostCarRepository.create({
        filePath: file.path.substring(1),
        name: file.fileName,
        size: file.size,
        hostCar: hostCar,
      });
      await this.fileHostCarRepository.save(fileHostCarDTO);
    });

    return 'Images saved successfully';
  }

  async StorageImg(
    bufferImgOriginal: Buffer,
    width: number,
    height: number,
    destination: string,
    newFileName: string,
  ) {
    await sharp(bufferImgOriginal)
      .resize(width, height, {
        fit: 'cover',
      })
      .toFormat('jpg')
      .toFile(`${destination}/${newFileName}`);
  }

  async uploadEntityImg(file: Express.Multer.File, user: TokenUser, field) {
    const entityService =
      user.userType == 'host' ? this.hostService : this.customerService;
    const entityData = await entityService.findByEmail(user.email);
    const bufferImgOriginal = readFileSync(file.path);
    const newFileName = `${uuidv4()}.jpg`;
    const [width, height] = imageSizes[1].size;

    await this.StorageImg(
      bufferImgOriginal,
      width,
      height,
      file.destination,
      newFileName,
    );

    const filePath = `${file.destination}/${newFileName}`;

    entityData[field] = filePath;
    await entityService.update(entityData);

    return filePath;
  }
}
