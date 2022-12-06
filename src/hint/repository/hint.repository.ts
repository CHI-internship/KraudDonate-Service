import { BadRequestException } from '@nestjs/common';
import { ICreateHint, IQueryParams, IUpdateHint } from '../interfaces';
import { AwsService, PrismaService } from '../../services';
import { AwsBucketFolders } from '../../types';

export default class HintRepository {
  constructor(
    private awsService: AwsService,
    private prismaService: PrismaService,
  ) {}

  async getAllHints(params: IQueryParams) {
    const { limit, page, search, sort } = params;
    const skip = limit * (page - 1);
    const hints = await this.prismaService.volunteer_hint
      .findMany({
        skip,
        take: limit,
        orderBy: {
          id: sort,
        },
        where: {
          title: {
            contains: search,
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
    const totalPages = Math.round(
      (await this.prismaService.volunteer_hint.count()) / limit,
    );
    return {
      page,
      limit,
      totalPages,
      data: hints,
    };
  }

  async getHintById(id: number) {
    return this.prismaService.volunteer_hint
      .findFirst({
        where: {
          id,
        },
        include: {
          hint_photo: true,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async getAllPhotosByHintId(hint_id: number) {
    return this.prismaService.volunteer_hint_photo.findMany({
      where: {
        hint_id,
      },
    });
  }

  async createHint(hint: ICreateHint, user_id: number) {
    await this.prismaService.$transaction(async (tx) => {
      const newHint = await tx.volunteer_hint
        .create({
          data: {
            info: hint.info,
            title: hint.title,
            user_id,
          },
        })
        .catch(() => {
          throw new BadRequestException('Something went wrong');
        });
      hint.photos.map(async (photo) => {
        photo = await this.awsService
          .uploadImg(photo, AwsBucketFolders.HINTPHOTO)
          .catch(() => {
            throw new BadRequestException('Something went wrong');
          });
        return this.createHintPhoto(photo, newHint.id);
      });
      return newHint;
    });
  }

  async createHintPhoto(photo: string, hint_id: number) {
    return this.prismaService.volunteer_hint_photo
      .create({
        data: {
          photo,
          hint_id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }

  async updateHintById(id: number, hint: IUpdateHint) {
    await this.prismaService.$transaction(async (tx) => {
      await tx.volunteer_hint
        .update({
          where: {
            id,
          },
          data: {
            title: hint.title != null ? hint.title : undefined,
            info: hint.info != null ? hint.info : undefined,
          },
        })
        .catch(() => {
          throw new BadRequestException('Something went wrong');
        });
      await this.updateHintPhotoById(id, hint.photos);
    });
  }

  async updateHintPhotoById(hintId: number, photos: string[]) {
    if (photos.length && hintId) {
      const photosByHintId = await this.getAllPhotosByHintId(hintId);

      if (photosByHintId.length) {
        photosByHintId.map(async (item) => {
          await this.awsService.deleteFile(item.photo);
          await this.deletePhotoById(item.id);
        });
      }
      photos.map((photo) => {
        return this.createHintPhoto(photo, hintId);
      });
    }
  }

  async deletePhotoById(id: number) {
    return this.prismaService.volunteer_hint_photo
      .delete({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new BadRequestException('Something went wrong');
      });
  }
}