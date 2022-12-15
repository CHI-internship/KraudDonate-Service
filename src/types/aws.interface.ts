import { S3 } from 'aws-sdk';
import { AwsBucketFolders } from './aws-bucket-folders.enum';

export abstract class IAwsService {
  s3: S3.ClientConfiguration | any;
  abstract uploadImg(base64: string, folder: AwsBucketFolders): Promise<string>;
  abstract uploadFile(
    base64: string,
    expansion: string,
    folder: AwsBucketFolders,
  ): Promise<string>;
  abstract deleteFile(location: string): Promise<{ success: boolean }>;
}
