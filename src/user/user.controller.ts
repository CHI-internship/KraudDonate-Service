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
import { UpdateUserSchema } from '../utils/validator/user';
import { AjvValidationPipe } from '../utils/validator/validation';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthHandleService } from '../services/auth.handle.service';
import { IdSchema } from '../utils/validator/order';
import { IdDto } from '../utils/validator/dto/id.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authHandleService: AuthHandleService,
  ) {}

  @ApiResponse({ status: 200, description: 'Return user info' })
  @Roles('volunteer', 'customer')
  @UseGuards(RolesGuard)
  @Get()
  getUser(@Req() req: Request) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.userService.getByEmail(email);
  }

  @ApiResponse({
    status: 200,
    description: 'Return user info with volunteer entitiy',
  })
  @Roles('customer')
  @UseGuards(RolesGuard)
  @Get('/attach')
  getUserAndVolunteer(@Req() req: Request) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    return this.userService.getByEmailWithVolunteerAndOrder(email);
  }

  @ApiResponse({ status: 200, description: 'Return updated user' })
  @Patch()
  @UsePipes(new AjvValidationPipe(UpdateUserSchema))
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { email } = this.authHandleService.getPayload(
      req.headers['authorization'],
    );
    const user = await this.userService.getByEmail(email);
    if (user) return this.userService.updateUser(updateUserDto, user.id);
  }

  @ApiResponse({ status: 200, description: 'Check if user if volunteer' })
  @Get('role-check')
  @UsePipes(new AjvValidationPipe(IdSchema))
  async isVolunteer(@Query() idNum: IdDto) {
    const { id } = idNum;
    const data = this.userService.userIsVolunteer(+id);
    return data;
  }
}
