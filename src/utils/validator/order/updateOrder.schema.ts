import { JSONSchemaType } from 'ajv';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

export const UpdateOrderSchema: JSONSchemaType<UpdateOrderDto> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      nullable: true,
    },
    info: {
      type: 'string',
      nullable: true,
    },
    photo: {
      type: 'string',
      nullable: true,
    },
    goal_amount: {
      type: 'number',
      nullable: true,
    },
    sum: {
      type: 'number',
      nullable: true,
    },
    short_info: {
      type: 'string',
      nullable: true,
    },
    finished_at: {
      type: 'string',
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
