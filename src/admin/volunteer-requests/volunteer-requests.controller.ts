import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Sse,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Observable, map, Subject } from 'rxjs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VolunteerRequestsService } from './volunteer-requests.service';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { AjvValidationPipe } from 'src/utils/validator/validation';
import { ApproveRequestSchema } from 'src/utils/validator/admin/approve-request/approve-request.schema';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { MessageEvent } from 'src/types';
import { emitter } from 'src/utils/emitter';

@ApiTags('Admin/requests')
@Controller('admin/requests')
export class VolunteerRequestsController {
  constructor(private volunteerRequestsService: VolunteerRequestsService) {}

  @ApiResponse({ status: 200, description: 'Get all requests from DB' })
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getRequests() {
    return this.volunteerRequestsService.getRequests();
  }

  @ApiResponse({
    status: 200,
    description: 'Get new requests after creation (Sse)',
  })
  @Sse('sse') //not protected
  async getRequestsSse(): Promise<Observable<MessageEvent>> {
    const subject$ = new Subject();
    emitter.on('newRequest', function (request) {
      subject$.next({ request });
    });
    return subject$.pipe(map((data: MessageEvent): MessageEvent => ({ data })));
  }

  @ApiResponse({ status: 200, description: 'Get single request from DB' })
  @Get('/:id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async getRequestById(@Param('id') id: string) {
    return this.volunteerRequestsService.getRequestById(+id);
  }

  @ApiResponse({ status: 201, description: 'Approve or reject request' })
  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UsePipes(new AjvValidationPipe(ApproveRequestSchema))
  async approveRequest(@Body() approveRequest: ApproveRequestDto) {
    return this.volunteerRequestsService.approveRequest(approveRequest);
  }
}
