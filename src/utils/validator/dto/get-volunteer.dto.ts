import { IBase64Documents } from 'src/types';

export class GetVolunteerDto {
  country: string;
  city: string;
  cardNumber: string;
  documents: IBase64Documents[];
  userId: number;
}
