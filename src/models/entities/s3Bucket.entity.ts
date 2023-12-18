import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BucketDocument = S3Bucket & Document;

@Schema()
export class S3Bucket {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const S3BucketSchema = SchemaFactory.createForClass(S3Bucket);
