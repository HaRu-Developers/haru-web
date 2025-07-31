// 모든 API 응답의 기본 구조 정의 interface
export interface BaseResponseDto<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
