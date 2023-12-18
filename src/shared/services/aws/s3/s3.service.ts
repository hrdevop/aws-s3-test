import { Injectable } from '@nestjs/common';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  ListBucketsCommand,
  CreateBucketCommand,
  GetObjectCommandOutput,
  PutObjectCommandOutput,
  ListObjectsV2CommandOutput,
  ListBucketsCommandOutput,
  CreateBucketCommandInput,
  CreateBucketCommandOutput,
  HeadBucketCommandInput,
  HeadBucketCommand,
  HeadBucketCommandOutput,
} from '@aws-sdk/client-s3';
import { AWSConfig } from 'src/configs/aws';

/**
 * Service for interacting with AWS S3.
 */
@Injectable()
export class S3Service {
  private s3Client: S3Client;

  /**
   * Initializes the S3 service with AWS configuration.
   */
  constructor() {
    this.s3Client = new S3Client(AWSConfig);
  }

  /**
   * Retrieves an object from S3.
   * @param {string} bucketName - The name of the bucket.
   * @param {string} key - The key of the object.
   * @returns {Promise<GetObjectCommandOutput>} - A promise that resolves to the S3 object.
   */
  async getObject(
    bucketName: string,
    key: string,
  ): Promise<GetObjectCommandOutput> {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    return this.s3Client.send(command);
  }

  /**
   * Uploads an object to S3.
   * @param {string} bucketName - The name of the bucket.
   * @param {string} key - The key under which to store the object.
   * @param {any} body - The content of the object.
   * @returns {Promise<PutObjectCommandOutput>} - A promise that resolves to the S3 response.
   */
  async createObject(
    bucketName: string,
    key: string,
    body: any,
  ): Promise<PutObjectCommandOutput> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: body,
    };
    const command = new PutObjectCommand(params);
    return this.s3Client.send(command);
  }

  /**
   * Lists objects in a bucket.
   * @param {string} bucketName - The name of the bucket.
   * @returns {Promise<ListObjectsV2CommandOutput>} - A promise that resolves to an array of S3 objects.
   */
  async listObject(bucketName: string): Promise<ListObjectsV2CommandOutput> {
    const params = {
      Bucket: bucketName,
    };
    const command = new ListObjectsV2Command(params);
    return this.s3Client.send(command);
  }

  /**
   * Lists all buckets.
   * @returns {Promise<ListBucketsCommandOutput>} - A promise that resolves to an array of S3 buckets.
   */
  async listBucket(): Promise<ListBucketsCommandOutput> {
    const command = new ListBucketsCommand({});
    return this.s3Client.send(command);
  }

  /**
   * Creates a new S3 bucket.
   * @param {string} bucketName - The name of the new bucket.
   * @returns {Promise<CreateBucketCommandOutput>} - A promise that resolves when the bucket is created.
   */
  async createBucket(bucketName: string): Promise<CreateBucketCommandOutput> {
    const createBucketParams: CreateBucketCommandInput = {
      Bucket: bucketName,
    };
    return this.s3Client.send(new CreateBucketCommand(createBucketParams));
  }

  /**
   * Checks if a bucket exists in Amazon S3.
   *
   * @param {string} bucketName - The name of the bucket to check.
   * @returns {Promise<HeadBucketCommandOutput>} - A promise that resolves to the result of the HeadBucket command.
   * @throws {Error} - Throws an error if the bucket does not exist or if there's an issue with the AWS SDK request.
   */
  async isBucketExists(bucketName: string): Promise<HeadBucketCommandOutput> {
    const bucketParams: HeadBucketCommandInput = {
      Bucket: bucketName,
    };
    return this.s3Client.send(new HeadBucketCommand(bucketParams));
  }
}
