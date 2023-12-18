import { IsString } from 'class-validator';

export class CreateS3BucketDto {
  @IsString()
  name: string;
}
