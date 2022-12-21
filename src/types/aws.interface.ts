import { AwsBucketFolders, IMultipleUploadFiles } from './aws.types';

export interface IAwsService {
  uploadImg(base64: string, folder: AwsBucketFolders): Promise<string>;
  uploadFile(
    base64: string,
    expansion: string,
    folder: AwsBucketFolders,
  ): Promise<string>;
  deleteFile(location: string): Promise<{ success: boolean }>;
  deleteMultipleFiles(locations: string[]): void;
  uploadMultipleFiles(
    files: IMultipleUploadFiles[],
    folder: AwsBucketFolders,
  ): Promise<string[]>;
}
