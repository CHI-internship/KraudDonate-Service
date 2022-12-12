export class AuthHandleServiceMock {
  getPayload = getPayloadMock;
}

export const getPayloadMock = jest.fn();
