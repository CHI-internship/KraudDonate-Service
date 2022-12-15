import { AwsBucketFolders } from './aws-bucket-folders.enum';

export interface IAwsService {
  uploadImg(base64: string, folder: AwsBucketFolders): Promise<string>;
  uploadFile(
    base64: string,
    expansion: string,
    folder: AwsBucketFolders,
  ): Promise<string>;
  deleteFile(location: string): Promise<{ success: boolean }>;
}
