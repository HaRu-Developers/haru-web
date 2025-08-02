import { ApiErrorBody } from '@common/types/api.types';

export class ApiError<T extends ApiErrorBody = ApiErrorBody> extends Error {
  status: number;
  body?: T;
  code?: string;
  isSuccess?: boolean;

  constructor(status: number, body: T) {
    super(body?.message || `API Error ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
    this.code = body?.code;
    this.isSuccess = body?.isSuccess;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      isSuccess: this.isSuccess,
      body: this.body,
    };
  }
}
