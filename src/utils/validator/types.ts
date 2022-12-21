import { AdminResetPassDto } from 'src/admin/admin-password/dto/admin-reset-pass.dto';
import { AdminUpdatePassDto } from 'src/admin/admin-password/dto/admin-update-pass.dto';
import { LoginAdminDto } from 'src/admin/auth/dto/login-admin.dto';
import { EmailDto } from 'src/password/dto/email.dto';
import { ResetPasswordDto } from 'src/password/dto/reset-password.dto';
import { UpdatePasswordDto } from 'src/password/dto/update-password.dto';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';
import { CreateUserDto } from './dto/create-user.validator.dto';
import { LoginUserDto } from './dto/login-user.validator.dto';
import { UpdateUserDto } from './dto/update-user.validator.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { GetVolunteerDto } from './dto/get-volunteer.dto';
import { IdDto } from './dto/id.dto';
import { CreateHintDto } from './dto/create-hint.dto';
import { DonateDto } from './dto/donate.dto';
import { UpdateSumDto } from './dto/update-sum.dto';
import { SortOrdersDto } from './dto/sortOrders.dto';

export type SchemaType =
  | CreateUserDto
  | LoginUserDto
  | UpdateUserDto
  | ApproveRequestDto
  | GetVolunteerDto
  | EmailDto
  | LoginAdminDto
  | AdminResetPassDto
  | AdminUpdatePassDto
  | ResetPasswordDto
  | UpdatePasswordDto
  | CreateOrderDto
  | UpdateOrderDto
  | PaginationDto
  | IdDto
  | CreateHintDto
  | DonateDto
  | UpdateSumDto
  | SortOrdersDto;
