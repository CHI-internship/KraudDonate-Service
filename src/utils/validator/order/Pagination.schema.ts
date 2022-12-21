import { JSONSchemaType } from 'ajv';
import { PaginationDto } from '../dto/pagination.dto';

export const PaginationSchema: JSONSchemaType<PaginationDto> = {
  type: 'object',
  properties: {
    page: {
      type: 'string',
      format: 'string-num',
    },
    limit: {
      type: 'string',
      format: 'string-num',
    },
    sort: {
      type: 'string',
      format: 'sort',
    },
    search: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  required: ['page', 'limit'],
  additionalProperties: false,
};
