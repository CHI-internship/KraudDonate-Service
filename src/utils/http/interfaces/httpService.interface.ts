import { Role } from '@prisma/client';
import { LoginAdminDto } from '../../../admin/auth/dto/login-admin.dto';
import { LoginUserDto } from '../../../auth/dto/login-user.dto';
import { ResetPasswordDto } from '../../../password/dto/reset-password.dto';
import { UpdatePasswordDto } from '../../../password/dto/update-password.dto';

export interface IHttpService {
  /**
   * @example <caption>Example usage of forgotPassword.</caption>
   * // Send data to /password/forgot, method - POST
   * forgotPassword(email)
   */
  forgotPassword(email: string): Promise<any>;
  /**
   * @example <caption>Example usage of resetPassword.</caption>
   * // Send data to /password/reset, method - PATCH
   * resetPassword(resetPasswordDto)
   */
  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any>;
  /**
   * @example <caption>Example usage of updatePassword.</caption>
   * // Send data to /password/update, method - PATCH
   * updatePassword(updatePasswordDto)
   */
  updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any>;
  /**
   * @example <caption>Example usage of signUp.</caption>
   * // Send data to /auth/signup, method - POST
   * signUp(email, password, role)
   */
  signUp(email: string, password: string, role: Role): Promise<any>;
  /**
   * @example <caption>Example usage of signIn.</caption>
   * // Send data to /auth/signin, method - POST
   * signIn(credentials)
   */
  signIn(credentials: LoginUserDto): Promise<any>;
  /**
   * @example <caption>Example usage of refreshToken.</caption>
   * // Send data to /auth/refresh-tokens, method - POST
   * refreshToken(email, role)
   */
  refreshToken(email: string, role: Role): Promise<any>;
  /**
   * @example <caption>Example usage of adminSignIn.</caption>
   * // Send data to /sign-in, method - POST
   * adminSignIn(adminPayload)
   */
  adminSignIn(adminPayload: LoginAdminDto): Promise<any>;
}
