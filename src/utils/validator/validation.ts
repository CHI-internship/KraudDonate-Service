import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { SchemaType } from './types';

@Injectable()
export class AjvValidationPipe implements PipeTransform {
  private _ajv: Ajv;

  constructor(private schema: JSONSchemaType<SchemaType>) {
    if (!this._ajv) {
      this._ajv = new Ajv({ allErrors: true });
      addFormats(this._ajv);
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema) {
      throw new Error('No scheme provided');
    }

    const validate = this._ajv.compile(this.schema);
    const isValid = validate(value);

    if (validate.errors) {
      const resError: Array<string> = [];

      for (const message of validate.errors) {
        const error = message.instancePath + ' ' + message.message;
        resError.push(error);
      }

      throw new BadRequestException(resError);
    }

    return value;
  }
}
