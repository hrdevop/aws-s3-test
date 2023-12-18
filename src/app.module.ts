import { Module } from '@nestjs/common';
import { S3Service } from './shared/services/aws/s3/s3.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './configs/mongoose';
import { S3Object, S3ObjectSchema } from './models/entities/s3Object.entity';
import { S3Bucket, S3BucketSchema } from './models/entities/s3Bucket.entity';
import { S3BucketController } from './controllers/s3Bucket.controller';
import { S3BucketsService } from './services/s3Bucket.service';
import { S3ObjectController } from './controllers/s3Object.controller';
import { S3ObjectService } from './services/s3Object.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    MongooseModule.forFeature([
      { name: S3Bucket.name, schema: S3BucketSchema },
      { name: S3Object.name, schema: S3ObjectSchema },
    ]),
  ],
  controllers: [S3BucketController, S3ObjectController],
  providers: [S3Service, S3BucketsService, S3ObjectService],
})
export class AppModule {}
