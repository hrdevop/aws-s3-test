import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IS3Object } from '../interfaces/s3Object.interface';

export type S3ObjectDocument = S3Object & Document;

@Schema()
export class S3Object implements IS3Object {
  @Prop({ required: true })
  bucketName: string;

  @Prop({ required: true })
  arn: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const S3ObjectSchema = SchemaFactory.createForClass(S3Object);
