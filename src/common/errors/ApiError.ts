/**
 * 공통 에러 객체 클래스
 *
 * 모든 API 호출에서 에러를 통일된 형태로 다룸
 */
import { ApiErrorBody } from '@common/types/api.common.types';

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
