import { AwsBucketFolders, IMultipleUploadFiles } from 'src/types';
import { IAwsService } from 'src/types/aws.interface';

export class MockAwsService implements IAwsService {
  s3: any;
  uploadImg(base64: string, folder: AwsBucketFolders) {
    return Promise.resolve('file location');
  }
  async deleteMultipleFiles(locations: string[]) {
    return;
  }

  async uploadMultipleFiles(
    files: IMultipleUploadFiles[],
    folder: AwsBucketFolders,
  ) {
    return Promise.resolve(['file location']);
  }

  uploadFile(base64: string, expansion: string, folder: AwsBucketFolders) {
    return Promise.resolve('file location');
  }
  deleteFile(location: string) {
    return Promise.resolve({ success: true });
  }
}
