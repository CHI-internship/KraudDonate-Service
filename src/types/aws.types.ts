export enum AwsBucketFolders {
  ORDER = 'order',
  USER_AVATAR = 'user-avatar',
  DOCUMENTS = 'documents',
  HINTPHOTO = 'hint-photo',
}

export interface IMultipleUploadFiles {
  base64File: string;
  ext: string;
}
