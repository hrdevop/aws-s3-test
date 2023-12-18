import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateS3ObjectDto } from 'src/models/dto/createS3Object.dto';
import { S3Object } from 'src/models/entities/s3Object.entity';
import { S3ObjectService } from 'src/services/s3Object.service';

@Controller('objects')
export class S3ObjectController {
  constructor(private s3ObjectService: S3ObjectService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createObject(
    @Body() createS3ObjectDto: CreateS3ObjectDto,
    @UploadedFile() file: any,
  ): Promise<S3Object> {
    return this.s3ObjectService.createObject(createS3ObjectDto, file);
  }

  @Get(':idOrKey')
  async getObjectByIdOrKey(
    @Param('idOrKey') idOrKey: string,
  ): Promise<S3Object> {
    return this.s3ObjectService.getObjectByIdOrKey(idOrKey);
  }

  @Get('list/:bucketName')
  async listObjectsByBucket(
    @Param('bucketName') bucketName: string,
  ): Promise<S3Object[]> {
    return this.s3ObjectService.listObjectsByBucket(bucketName);
  }
}
