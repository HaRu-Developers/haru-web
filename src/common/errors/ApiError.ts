/**
 * 공통 에러 객체 클래스
 *
 * 모든 API 호출에서 에러를 통일된 형태로 다룸
 */
import { ApiErrorBody } from '@common/types/api.common.types';

export class ApiError<T extends ApiErrorBody = ApiErrorBody> extends Error {
  status: number; // HTTP status
  body?: T;
  code?: string;
  isSuccess?: boolean;
  rawText?: string;
  url?: string;
  method?: string;

  constructor(opts: {
    status: number;
    message: string;
    code?: string;
    isSuccess?: boolean;
    body?: T;
    rawText?: string;
    url?: string;
    method?: string;
  }) {
    super(opts.message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = opts.status;
    this.code = opts.code;
    this.isSuccess = opts.body?.isSuccess;
    this.body = opts.body;
    this.rawText = opts.rawText;
    this.url = opts.url;
    this.method = opts.method;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      isSuccess: this.isSuccess,
      url: this.url,
      method: this.method,
      body: this.body,
      rawText: this.rawText,
    };
  }
}
