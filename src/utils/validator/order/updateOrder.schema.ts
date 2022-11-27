import { JSONSchemaType } from 'ajv';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

export const UpdateOrderSchema: JSONSchemaType<UpdateOrderDto> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    info: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
    goal_amount: {
      type: 'number',
    },
    sum: {
      type: 'number',
    },
    short_info: {
      type: 'string',
    },
    finished_at: {
      type: 'string',
    },
  },
  required: [],
  additionalProperties: false,
};
