import { notFound } from 'next/navigation';

/**
 * 쿼리 파라미터처럼 신뢰할 수 없는 문자열 입력을 enum 값으로 변환하되,
 * 유효하지 않으면 404 페이지를 트리거합니다.
 *
 * @template T - enum 값 타입
 * @param value - 검사할 값
 * @param enumObject - enum 객체
 * @param fallback - 값이 없을 때 사용할 기본값 (undefined만 fallback 처리)
 * @returns 유효한 enum 값
 */
const parseEnumOr404 = <T extends string>(
  value: unknown,
  enumObject: Record<string, T>,
  fallback: T,
): T => {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value === 'string' && Object.values(enumObject).includes(value as T)) {
    return value as T;
  }

  notFound();
};

export default parseEnumOr404;
