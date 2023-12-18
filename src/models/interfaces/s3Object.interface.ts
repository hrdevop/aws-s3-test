import { Document } from 'mongoose';

export interface IS3Object {
  id?: Document;
  bucketName: string;
  arn: string;
  key: string;
  url: string;
  createdAt?: Date;
}
