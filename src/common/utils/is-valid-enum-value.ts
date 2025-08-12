/**
 * @description enumObject에 value가 포함되는지 확인 (유효성 검사용)
 */
const isValidEnumValue = <T extends string>(
  value: unknown,
  enumObject: Record<string, T>,
): value is T => {
  return typeof value === 'string' && Object.values(enumObject).includes(value as T);
};

export default isValidEnumValue;
