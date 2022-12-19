import { AwsBucketFolders } from 'src/types';
import { IAuthHandleService } from 'src/types/auth-handle-service.interface';
import { IAwsService } from 'src/types/aws.interface';
import { userMock } from '../user/repository/user.repository.mock';

export class MockAwsService implements IAwsService {
  s3: any;
  uploadImg(base64: string, folder: AwsBucketFolders) {
    return Promise.resolve('file location');
  }
  uploadFile(base64: string, expansion: string, folder: AwsBucketFolders) {
    return Promise.resolve('file location');
  }
  deleteFile(location: string) {
    return Promise.resolve({ success: true });
  }
}

export class MockAuthHandleService implements IAuthHandleService {
  getPayload(rawToken?: string) {
    return userMock();
  }
}
