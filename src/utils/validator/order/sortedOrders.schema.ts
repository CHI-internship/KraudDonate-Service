import { JSONSchemaType } from 'ajv';
import { SortOrdersDto } from '../dto/sortOrders.dto';

export const getSortedOrdersSchema: JSONSchemaType<SortOrdersDto> = {
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
    sortBy: {
      type: 'string',
      format: 'sortBy',
    },
    search: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
  },
  required: ['page', 'limit', 'sortBy'],
  additionalProperties: false,
};
