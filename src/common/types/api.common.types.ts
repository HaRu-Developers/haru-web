/**
 * 모든 API 응답의 기본 구조 정의 interface
 *
 * API Response의 type을 제네릭으로 제공해야 합니다.
 * @example
 * BaseResponseDto<YourApiResponseDto>
 */
export interface BaseResponseDto<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 에러 발생시 body 구조
export interface ApiErrorBody {
  isSuccess: boolean;
  code: string;
  message: string;
}
