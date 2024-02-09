import { env } from '@/env';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

interface FileUploadServiceResponse {
  ETag: string;
  ServerSideEncryption: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
}

@Injectable()
export class FileUploadService {
  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
    mimetype: string,
  ): Promise<FileUploadServiceResponse> {
    const s3 = new AWS.S3({
      region: env.AWS_BUCKET_REGION,
      accessKeyId: env.AWS_S3_ACCESS_KEY,
      secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
    });

    const uploadResult = await s3
      .upload({
        ContentDisposition: 'inline',
        ContentType: mimetype,
        Bucket: env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();

    return uploadResult as FileUploadServiceResponse;
  }
}
