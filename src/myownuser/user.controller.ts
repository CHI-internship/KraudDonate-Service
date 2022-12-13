import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Patch,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('myownuser')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(RolesGuard)
  @Get('/:id')
  getUser(@Req() req: Request) {
    return this.userService.getById(+req.params.id);
  }
}
