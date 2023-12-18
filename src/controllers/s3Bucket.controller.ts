// s3-bucket.controller.ts

import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateS3BucketDto } from 'src/models/dto/createS3Bucket.dto';
import { IS3Bucket } from 'src/models/interfaces/s3Bucket.interface';
import { S3BucketsService } from 'src/services/s3Bucket.service';

@Controller('buckets')
export class S3BucketController {
  constructor(private readonly s3bucketsService: S3BucketsService) {}

  @Post()
  async createBucket(
    @Body() createS3BucketDto: CreateS3BucketDto,
  ): Promise<IS3Bucket> {
    const createdBucket =
      await this.s3bucketsService.createBucket(createS3BucketDto);
    return createdBucket;
  }

  @Get()
  async listBuckets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<IS3Bucket[]> {
    try {
      const buckets = await this.s3bucketsService.listBuckets(page, limit);
      return buckets;
    } catch (error) {
      throw new HttpException(
        'Failed to list buckets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
