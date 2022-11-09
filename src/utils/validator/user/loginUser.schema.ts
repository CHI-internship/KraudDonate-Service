import { JSONSchemaType } from "ajv";
import { LoginUserDto } from "../dto/login-user.validator.dto";
import { email } from "../shared/email.schema";
import { password } from "../shared/password.schema";

export const LoginUserSchema: JSONSchemaType<LoginUserDto> = {
  type: "object",
  properties: { 
    email: email,
    password: password
  },
  required: ["email", "password"],
  additionalProperties: false
}