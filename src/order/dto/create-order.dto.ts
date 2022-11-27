import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Hello World',
    description: 'Order title',
    type: String,
  })
  title: string;

  @ApiProperty({
    example: 'Smth about order',
    description: 'Order info',
    type: String,
  })
  info: string;

  @ApiProperty({
    example: 1,
    description: 'User identificator',
    type: Number,
  })
  user_id: number;

  @ApiProperty({
    example: 'Photo',
    description: 'Photo',
    type: String,
  })
  photo: string;

  @ApiProperty({
    example: 500,
    description: 'Number of donation',
    type: Number,
  })
  goal_amount: number;

  @ApiProperty({
    example: 'Smth about order',
    description: 'Order info',
    type: String,
  })
  short_info: string;

  @ApiProperty({
    example: '2018-03-29T13:34:00.000',
    description: 'When the order will finish',
    type: String,
  })
  finished_at: string;
}
