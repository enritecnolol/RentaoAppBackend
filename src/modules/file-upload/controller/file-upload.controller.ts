import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '../../../core/decorators/user.decorator';
import { TokenUser } from '../../../types';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { FileUploadService } from '../service/file-upload.service';

@Controller('api/v1/file-upload')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/host-car/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFileHostCar(@UploadedFiles() files, @Param('id') id: string) {
    return this.fileUploadService.uploadFileHostCar(files, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/entity-img/:field')
  @UseInterceptors(FilesInterceptor('file'))
  uploadEntityImg(
    @UploadedFiles() file: Express.Multer.File,
    @User() user: TokenUser,
    @Param('field') field: string,
    @Body() body,
  ) {
    if (!(field == 'identificationImg' || field == 'profileImg')) {
      throw new HttpException('invalid param', 400);
    }
    console.log('file:', file);
    console.log('Body:', body);
    return this.fileUploadService.uploadEntityImg(file[0], user, field);
  }
}
