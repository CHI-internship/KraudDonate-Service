import { BadRequestException, Injectable } from '@nestjs/common';
import HintRepository from './repository/hint.repository';
import { UserService } from '../user/user.service';
import { CreateHintDto } from './dto/create-hint.dto';
import { UpdateHintDto } from './dto/update-hint.dto';

@Injectable()
export class HintService {
  constructor(
    private hintRepository: HintRepository,
    private userService: UserService,
  ) {}

  async getAllHints(limit: number, sort: string, page: number, search: string) {
    return this.hintRepository.getAllHints({ limit, sort, page, search });
  }

  async getHintById(id: number) {
    return this.hintRepository.getHintById(id);
  }

  async createHint(hint: CreateHintDto, email: string) {
    const userFromDb = await this.userService.getByEmail(email);
    if (!userFromDb) throw new BadRequestException('Something went wrong');
    return this.hintRepository.createHint(hint, userFromDb.id);
  }

  async updateHintById(id: number, hint: UpdateHintDto) {
    const hintFromDb = await this.getHintById(id);
    if (!hintFromDb) throw new BadRequestException('Hint not found.');
    return this.hintRepository.updateHintById(id, hint);
  }
}
