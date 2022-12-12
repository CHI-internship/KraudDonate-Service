export class AxiosErrorMock extends Error {
  error: any;
  constructor(error: any) {
    super();
    this.error = error;
  }
}
