import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
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
}
