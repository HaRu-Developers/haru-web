import type { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * 안전한 뒤로 가기를 위한 from 생성 함수
 *
 * @param {string} pathname
 * @param {ReadonlyURLSearchParams | URLSearchParams | null} searchParams
 */
const buildFrom = (
  pathname: string,
  searchParams?: ReadonlyURLSearchParams | URLSearchParams | null,
) => {
  const q = searchParams?.toString();
  return q ? `${pathname}?${q}` : pathname;
};

export default buildFrom;
