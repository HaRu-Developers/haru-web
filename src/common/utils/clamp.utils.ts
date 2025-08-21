/**
 * 0 ~ 1 사이로 clamp 해주는 함수
 */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
