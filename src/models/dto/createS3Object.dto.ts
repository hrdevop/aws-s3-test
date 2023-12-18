import { IsNotEmpty, IsString } from 'class-validator';

export class CreateS3ObjectDto {
  @IsNotEmpty()
  @IsString()
  readonly bucketName: string;

  @IsNotEmpty()
  @IsString()
  readonly key: string;

  readonly file: any;
}
