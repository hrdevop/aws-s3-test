import { S3Service } from './../shared/services/aws/s3/s3.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateS3BucketDto } from 'src/models/dto/createS3Bucket.dto';
import { S3Bucket } from 'src/models/entities/s3Bucket.entity';
import { IS3Bucket } from 'src/models/interfaces/s3Bucket.interface';

@Injectable()
export class S3BucketsService {
  constructor(
    @InjectModel(S3Bucket.name) private s3BucketModel: Model<S3Bucket>,
    private s3Service: S3Service,
  ) {}

  async createBucket(createS3BucketDto: CreateS3BucketDto): Promise<IS3Bucket> {
    const { name } = createS3BucketDto;
    try {
      await this.s3Service.isBucketExists(name);
      throw new ConflictException(`Bucket '${name}' already exists`);
    } catch (error) {
      if (!(error instanceof ConflictException)) {
        throw error;
      }
      await this.s3Service.createBucket(name);
      const createdBucket = new this.s3BucketModel(createS3BucketDto);
      return createdBucket.save();
    }
  }
  async listBuckets(page: number, limit: number): Promise<IS3Bucket[]> {
    const skip = (page - 1) * limit;
    return this.s3BucketModel.find().skip(skip).limit(limit).exec();
  }
}
