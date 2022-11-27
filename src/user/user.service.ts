import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AwsService } from 'src/services/aws.service';
import { AwsBucketFolders } from 'src/types';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './repository/user.repository';
import * as gravatar from 'gravatar';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private awsService: AwsService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async delete(email: string) {
    const user = await this.userRepository.delete(email);
    return user;
  }

  async create(user: CreateUserDto) {
    user.photo = gravatar.url(
      user.email.trim().toLowerCase(),
      { d: 'mp' },
      false,
    );
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async getUserById(id: number) {
    return this.userRepository.getById(id);
  }

  async updateUser(updateUserPayload: UpdateUserDto) {
    if (updateUserPayload.image) {
      const user = await this.userRepository.getById(updateUserPayload.userId);
      if (!user) throw new BadRequestException('User not found.');
      const oldPhoto = user.photo;

      updateUserPayload.image = await this.awsService
        .uploadImg(updateUserPayload.image, AwsBucketFolders.USER_AVATAR)
        .then(async (data) => {
          if (oldPhoto) await this.awsService.deleteFile(oldPhoto);
          return data;
        });
    }

    const user = await this.userRepository.update(updateUserPayload);
    return user;
  }
}
