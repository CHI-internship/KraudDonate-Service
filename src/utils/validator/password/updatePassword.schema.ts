import { JSONSchemaType } from 'ajv';
import { UpdatePasswordDto } from 'src/password/dto/update-password.dto';
import { password } from '../shared/password.schema';

export const UpdatePasswordSchema: JSONSchemaType<UpdatePasswordDto> = {
  type: 'object',
  properties: {
    oldPassword: password,
    newPassword: {
      type: 'string',
      minLength: 8,
      not: {
        const: {
          $data: '1/oldPassword',
        },
      },
    },
    userId: {
      type: 'number',
    },
  },
  required: ['oldPassword', 'newPassword', 'userId'],
  errorMessage: {
    properties: {
      newPassword:
        "should be a string with min length 8 and don't match the oldPassword",
    },
  },
  additionalProperties: false,
};
