import { Injectable } from '@nestjs/common';

@Injectable()
export class UserServiceMock {
  getByEmail = getByEmailMock;
  create = createMock;
  delete = deleteMock;
}

export const getByEmailMock = jest.fn();
export const createMock = jest.fn();
export const deleteMock = jest.fn();
