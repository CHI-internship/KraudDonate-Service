import { AwsService } from '../aws.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsBucketFolders } from '../../types';
import { imageToAws } from './test.image';

describe('Aws Service', () => {
  let awsService: AwsService;
  let url = '';

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AwsService],
    }).compile();
    awsService = moduleRef.get<AwsService>(AwsService);
  });

  describe('Upload Image', () => {
    test('Upload Image to Aws', async () => {
      const data = await awsService.uploadImg(
        imageToAws,
        AwsBucketFolders.ORDER,
      );
      const awsBucket = 'https://krauddonate161122';
      expect(awsBucket).toEqual(data.split('.')[0]);
    });
  });

  describe('Upload File', () => {
    test('Upload File to Aws', async () => {
      const data = await awsService.uploadFile(
        imageToAws,
        'pdf',
        AwsBucketFolders.ORDER,
      );
      url = data;
      const awsBucket = 'https://krauddonate161122';
      expect(awsBucket).toEqual(data.split('.')[0]);
    });
  });

  describe('Delete File', () => {
    test('Delete file from Aws', async () => {
      const data = await awsService.deleteFile(url);
      expect(true).toEqual(data.success);
    });
  });
});
