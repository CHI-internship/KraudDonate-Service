import { JSONSchemaType } from 'ajv';
import { IdUserIdDto } from '../dto/idUserId.dto';

export const IdUserIdSchema: JSONSchemaType<IdUserIdDto> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'string-num',
    },
    userId: {
      type: 'string',
      format: 'string-num',
    },
  },
  required: [],
  additionalProperties: false,
};
