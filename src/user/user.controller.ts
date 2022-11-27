import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UpdateUserSchema } from '../utils/validator/user';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthHandleService } from 'src/services';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({ status: 200, description: 'Return user info' })
  @Roles('customer')
  @UseGuards(RolesGuard)
  @Get()
  get(@Req() req) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.userService.getByEmail(email);
  }

  @ApiResponse({ status: 200, description: 'Return updated user' })
  @Patch()
  @UsePipes(new AjvValidationPipe(UpdateUserSchema))
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(updateUserDto);
    return user;
  }
}
