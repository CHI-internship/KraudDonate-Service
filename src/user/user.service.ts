import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AwsService } from 'src/services/aws.service';
import { AwsBucketFolders } from 'src/types/aws-bucket-folders.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRepository from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository,
    private awsService: AwsService) { }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    return user;
  }

  async delete(email: string) {
    const user = await this.userRepository.delete(email);
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = await this.userRepository.create(user);
    return newUser;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    if (updateUserDto.image) {
      const user = await this.userRepository.getById(updateUserDto.userId)
      if (!user) throw new BadRequestException('User not found.')
      const oldPhoto = user.photo

      updateUserDto.image = await this.awsService.
        uploadImg(updateUserDto.image, AwsBucketFolders.USER_AVATAR)
        .then(async (data) => {
          if (oldPhoto) await this.awsService.deleteFile(oldPhoto)
          return data
        })
    }

    const user = await this.userRepository.update(updateUserDto);
    return user;
  }
}
