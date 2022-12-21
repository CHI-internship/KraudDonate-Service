import { JSONSchemaType } from 'ajv';
import { GetVolunteerDto } from '../dto/get-volunteer.dto';

export const GetVolunteerSchema: JSONSchemaType<GetVolunteerDto> = {
  type: 'object',
  properties: {
    country: {
      type: 'string',
      maxLength: 40,
      minLength: 3,
    },
    city: {
      type: 'string',
      maxLength: 30,
      minLength: 3,
    },
    cardNumber: {
      type: 'string',
      minLength: 8,
    },
    documents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          base64File: {
            type: 'string',
          },
          ext: {
            type: 'string',
          },
        },
        required: ['base64File', 'ext'],
      },
    },
    userId: {
      type: 'integer',
    },
  },
  required: ['userId', 'city', 'cardNumber', 'country', 'documents'],
  additionalProperties: false,
};
