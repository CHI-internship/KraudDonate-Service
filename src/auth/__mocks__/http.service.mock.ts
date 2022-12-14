export class HttpServiceMock {
  signIn = signInMock;
  signUp = signUpMock;
  refreshToken = refreshTokenMock;
}

export const signInMock = jest.fn();
export const signUpMock = jest.fn();
export const refreshTokenMock = jest.fn();
