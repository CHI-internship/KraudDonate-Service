export class HttpServiceMock {
  post = postMock;
}

export const postMock = jest.fn();
