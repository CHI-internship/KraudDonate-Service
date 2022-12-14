import { Role } from '@prisma/client';
import { LoginAdminDto } from '../../admin/auth/dto/login-admin.dto';
import { LoginUserDto } from '../../auth/dto/login-user.dto';
import { ResetPasswordDto } from '../../password/dto/reset-password.dto';
import { UpdatePasswordDto } from '../../password/dto/update-password.dto';
import { IHttpService } from './interfaces/httpService.interface';

export default class HttpMockService implements IHttpService {
  forgotPassword(email: string): Promise<any> {
    return Promise.resolve({ success: true });
  }
  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    return Promise.resolve({ success: true });
  }
  updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any> {
    return Promise.resolve({ success: true });
  }
  signUp(email: string, password: string, role: Role): Promise<any> {
    return Promise.resolve({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTAyMjQ1M30.c4AiNJI7pV0fyKJh6p4EY7PNms8NvB_5uEDZfuXLw9I',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTEwODg1M30.r6xaJTl9SCGc8zHz7L1bZ5AvmDiMsTZDl5nNofvL8sU',
    });
  }
  signIn(credentials: LoginUserDto): Promise<any> {
    return Promise.resolve({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTAyMjQ1M30.c4AiNJI7pV0fyKJh6p4EY7PNms8NvB_5uEDZfuXLw9I',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTEwODg1M30.r6xaJTl9SCGc8zHz7L1bZ5AvmDiMsTZDl5nNofvL8sU',
    });
  }
  refreshToken(email: string, role: Role): Promise<any> {
    return Promise.resolve({
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTAyMjQ1M30.c4AiNJI7pV0fyKJh6p4EY7PNms8NvB_5uEDZfuXLw9I',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAaG90bWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA5MzYwNTMsImV4cCI6MTY3MTEwODg1M30.r6xaJTl9SCGc8zHz7L1bZ5AvmDiMsTZDl5nNofvL8sU',
    });
  }
  adminSignIn(adminPayload: LoginAdminDto): Promise<any> {
    return Promise.resolve({
      message: 'success',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluX2tyYXVkQGhvdG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MDkzNTc5NCwiZXhwIjoxNjcxMDIyMTk0fQ.mvzdp8Rf16JW8ZiTeGY1xWr_a-KcwXJGFwn-_ZFCcms',
    });
  }
}
