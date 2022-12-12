import axios, { AxiosInstance } from 'axios';
import { IHttpService } from './http.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class HttpService implements IHttpService {
  private http: AxiosInstance;
  constructor() {
    this.http = axios.create({
      baseURL: process.env.AUTH_SERVICE_URL!,
    });
  }

  async post(path: string, data: object) {
    const res = await this.http.post(path, data);
    return res;
  }

  async patch(path: string, data: object) {
    const res = await this.http.patch(path, data);
    return res;
  }
}
