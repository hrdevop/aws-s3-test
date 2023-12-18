import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateS3ObjectDto } from 'src/models/dto/createS3Object.dto';
import { S3Object } from 'src/models/entities/s3Object.entity';
import { S3Service } from 'src/shared/services/aws/s3/s3.service';
import { parseUrl } from 'src/utils';

@Injectable()
export class S3ObjectService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(S3Object.name) private readonly s3ObjectModel: Model<S3Object>,
  ) {}

  async getObjectByIdOrKey(identifier: string): Promise<S3Object> {
    try {
      const foundObject = await this.s3ObjectModel
        .findOne({ $or: [{ _id: identifier }, { key: identifier }] })
        .exec();

      if (!foundObject) {
        throw new NotFoundException('Object not found');
      }

      return foundObject;
    } catch (error) {
      throw new NotFoundException('Object not found');
    }
  }

  async createObject(
    createS3ObjectDto: CreateS3ObjectDto,
    file: any,
  ): Promise<S3Object> {
    try {
      const { bucketName, key } = createS3ObjectDto;
      await this.s3Service.createObject(bucketName, key, file);
      const createdObject = await this.s3ObjectModel.create({
        bucketName,
        key,
        url: parseUrl(bucketName, key),
      });
      return createdObject;
    } catch (error) {
      throw new HttpException(
        'Error creating S3 object',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async listObjectsByBucket(bucketName: string): Promise<S3Object[]> {
    try {
      const objectsInBucket = await this.s3ObjectModel
        .find({ bucketName })
        .exec();
      return objectsInBucket;
    } catch (error) {
      throw new NotFoundException('Error listing objects by bucket');
    }
  }
}
