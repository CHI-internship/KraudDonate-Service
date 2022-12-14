import { BadRequestException } from '@nestjs/common';
import { ICreateHint, IQueryParams, IUpdateHint } from '../interfaces';
import { AwsService } from '../../services';
import { AwsBucketFolders } from '../../types';
import Repository from '../../repository/repository';

export default class HintRepository extends Repository {
  private awsService = new AwsService();

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
        include: {
          hint_photo: true,
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
    return this.prismaService.$transaction(async (tx) => {
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
      if (hint.photo?.length) {
        await this.createHintPhoto(hint.photo, newHint.id, tx);
      }
      return newHint;
    });
  }

  async createHintPhoto(photos: string[], hint_id: number, tx) {
    await Promise.all(
      photos.map(async (photo) => {
        photo = await this.awsService
          .uploadImg(photo, AwsBucketFolders.HINTPHOTO)
          .catch(() => {
            throw new BadRequestException('Something went wrong');
          });
        await tx.volunteer_hint_photo
          .create({
            data: {
              photo,
              hint_id,
            },
          })
          .catch(() => {
            throw new BadRequestException('Something went wrong');
          });
      }),
    );
  }

  async updateHintById(id: number, hint: IUpdateHint) {
    return this.prismaService.$transaction(async (tx) => {
      const updateHint = await tx.volunteer_hint
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
      if (hint.photo?.length) {
        await this.updateHintPhotoById(id, hint.photo, tx);
      }
      return updateHint;
    });
  }

  async updateHintPhotoById(hintId: number, photos: string[], tx) {
    const photosByHintId = await this.getAllPhotosByHintId(hintId);

    if (photosByHintId.length) {
      await Promise.all(
        photosByHintId.map(async (item) => {
          await this.awsService.deleteFile(item.photo);
          await this.deletePhotoById(item.id, tx);
        }),
      );
    }
    return this.createHintPhoto(photos, hintId, tx);
  }

  async deletePhotoById(id: number, tx) {
    return tx.volunteer_hint_photo
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
