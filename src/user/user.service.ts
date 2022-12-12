import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AwsBucketFolders } from '../types/aws-bucket-folders.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './repository/user.repository';
import * as gravatar from 'gravatar';
import { AwsService } from '../services/aws.service';

@Injectable()
export class UserService {
  constructor(
    //private userRepository: UserRepository,
    //private awsService: AwsService,
    @Inject(forwardRef(() => AwsService))
    private awsService: AwsService,
    @Inject(forwardRef(() => UserRepository))
    private userRepository: UserRepository,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async getByEmailWithVolunteerAndOrder(email: string) {
    const user = await this.userRepository.getByEmailWithVolunteerAndOrder(
      email,
    );
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

  async updateUser(updateUserPayload: UpdateUserDto, userId: number) {
    if (updateUserPayload.image) {
      const user = await this.userRepository.getById(userId);
      const oldPhoto = user?.photo;

      updateUserPayload.image = await this.awsService
        .uploadImg(updateUserPayload.image, AwsBucketFolders.USER_AVATAR)
        .then(async (data) => {
          if (oldPhoto) await this.awsService.deleteFile(oldPhoto);
          return data;
        });
    }

    const user = await this.userRepository.update(updateUserPayload, userId);
    return user;
  }

  async userIsVolunteer(id: number) {
    const user = await this.userRepository.getById(id);
    if (user?.role === 'volunteer') return true;
    return false;
  }
}
