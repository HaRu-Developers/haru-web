/**
 * 쿼리 파라미터처럼 신뢰할 수 없는 문자열 입력을 enum 타입으로 안전하게 변환할 때 사용할 함수
 *
 * 주어진 문자열 값이 enum 값 중 하나인지 확인하고,
 * 유효하면 해당 값을 반환하고, 그렇지 않으면 기본값을 반환
 *
 * @template T - enum 값 타입 (string literal union)
 * @param {unknown} value - 검사할 값 (주로 쿼리 파라미터에서 온 값)
 * @param {Record<string, T>} enumObject - enum 객체 (값만 사용)
 * @param {T} defaultValue - 유효하지 않을 때 반환할 기본 enum 값
 * @returns {T} - 유효한 enum 값 또는 기본값
 *
 */
const parseEnumQueryParam = <T extends string>(
  value: unknown,
  enumObject: Record<string, T>,
  defaultValue: T,
): T => {
  return typeof value === 'string' && Object.values(enumObject).includes(value as T)
    ? (value as T)
    : defaultValue;
};

export default parseEnumQueryParam;
