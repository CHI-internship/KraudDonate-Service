export class JwtServiceMock {
  sign = signMock;
}

export const signMock = jest.fn();
