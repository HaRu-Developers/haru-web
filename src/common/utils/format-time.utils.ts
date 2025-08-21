export const formatDateTimeArray = (dateArray: number[] | undefined): string => {
  if (!dateArray || dateArray.length < 6) return '';
  const [year, month, day, hour, minute] = dateArray;
  const date = new Date(year, month - 1, day, hour, minute);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

/**
 * JS Date가 안전하게 파싱할 수 있게 ISO 문자열 정규화
 * - 소수점은 최대 3자리(ms)로 자르고
 * - 타임존이 없으면 기본값으로 'Z'(UTC) 부여
 */
export const normalizeIsoForJs = (
  iso: string | null | undefined,
  defaultTz: 'Z' | '+09:00' = 'Z',
) => {
  if (!iso) return '';
  const s = iso.trim();
  if (!s) return '';

  const m = s.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.(\d+))?([Zz]|[+-]\d{2}:\d{2})?$/);
  if (!m) return s; // 형태가 다르면 원본 반환 (Date.parse가 처리하게 둠)

  const [, date, time, fracRaw = '', tzRaw] = m;
  const tz = tzRaw ?? defaultTz;
  const frac = fracRaw ? fracRaw.slice(0, 3).padEnd(3, '0') : '000';

  return `${date}T${time}.${frac}${tz}`;
};

/**
 * 두 ISO 시각 차이를 초 단위로 반환 (음수면 0)
 */
export const calcElapsedSeconds = (
  firstIso: string | null | undefined,
  secondIso: string | null | undefined,
) => {
  const baseMs = Date.parse(normalizeIsoForJs(firstIso));
  const tMs = Date.parse(normalizeIsoForJs(secondIso));
  if (!Number.isFinite(baseMs) || !Number.isFinite(tMs)) return 0;
  return Math.max(0, (tMs - baseMs) / 1000);
};

/**
 * 초 → "MM:SS" 포맷
 */
export const toMMSS = (sec: number) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};
