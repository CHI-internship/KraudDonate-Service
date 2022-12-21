import { ApiProperty } from '@nestjs/swagger';
import { IBase64Documents } from 'src/types';

export class GetVolunteerDto {
  @ApiProperty({
    example: 'Ukraine',
    description: 'country,where you from',
    type: String,
  })
  country: string;

  @ApiProperty({
    example: 'Lviv',
    description: 'city where you live',
    type: String,
  })
  city: string;

  @ApiProperty({
    example: '1234 5678 1234 5678',
    description: 'your card',
    type: String,
  })
  cardNumber: string;

  @ApiProperty({
    example: 'passport photo',
    description: 'passport photo',
    type: Array,
  })
  documents: IBase64Documents[];

  @ApiProperty({
    example: 1,
    description: 'your id',
    type: Number,
  })
  userId: number;
}
