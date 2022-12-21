import { ApiProperty } from '@nestjs/swagger';
import { VolunteerRequestStatus } from 'src/types';

export class ApproveRequestDto {
  @ApiProperty({
    example: 1,
    description: 'user Id',
    type: Number,
  })
  userId: number;

  @ApiProperty({
    example: 'true or false',
    description: 'status of request',
    type: String,
  })
  status: VolunteerRequestStatus;

  @ApiProperty({
    example: 'Reject',
    description: 'message with reason for rejection',
    type: String,
  })
  message: string;
}
