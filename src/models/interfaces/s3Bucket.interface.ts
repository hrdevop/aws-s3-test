import { Document } from 'mongoose';

export interface IS3Bucket {
  id?: Document;
  name: string;
  createdAt?: Date;
}
