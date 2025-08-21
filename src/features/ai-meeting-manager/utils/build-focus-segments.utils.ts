import { FocusSegment } from '../types/meeting.types';

/** ISO string 숫자로 파싱하는 함수 */
const toMs = (iso: string) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : NaN;
};

/**
 * 세그먼트 시간축을 '첫 발화 시작' -> 0으로 맞춰 정규화
 *
 * 서버에서 회의 시작 시간을 발화가 끝난 시간으로 주니까
 */
export const normalizeSegmentsToFirst = (segments: FocusSegment[]) => {
  if (!segments?.length) return [];

  const firstStart = segments[0].startMs;

  return segments.map((s) => ({
    segmentId: s.segmentId,
    startMs: Math.max(0, s.startMs - firstStart),
    endMs: Math.max(0, s.endMs - firstStart),
  }));
};

/**
 * 마지막 segmentd의 endMs를 audioDurationMs와 맞춤
 */
export const clampSegmentsToAudio = (segments: FocusSegment[], audioDurationMs: number) => {
  if (!segments.length || !audioDurationMs) return segments;
  const last = segments[segments.length - 1];
  if (last.endMs > audioDurationMs) {
    const copy = segments.slice();
    copy[copy.length - 1] = { ...last, endMs: audioDurationMs };
    return copy;
  }
  return segments;
};

/**
 * 플레이바 이동으로 발화, 질문 포커스를 위한 세그먼트 생성 함수
 *
 * @params speeches: { segmentId, startTime(ISO) ... }
 * @params baseIso : 오디오 0초 기준 (meetingStartTime ISO)
 */
const buildFocusSegments = (
  speeches: { segmentId: number; startTime: string }[],
  baseIso: string,
) => {
  if (!speeches?.length) return [];

  // 1) 파싱 + 정렬
  const parsed = speeches
    .map((s) => ({ segmentId: s.segmentId, startAbs: toMs(s.startTime) }))
    .filter((s) => !Number.isNaN(s.startAbs))
    .sort((a, b) => a.startAbs - b.startAbs);

  if (!parsed.length) return [];

  // 2) 0초 기준(베이스) 계산
  const baseMs = toMs(baseIso);
  const hasValidBase = Number.isFinite(baseMs);
  const base = hasValidBase ? (baseMs as number) : parsed[0].startAbs;

  // 3) 상대 시각으로 변환(음수는 0으로)
  const rel = parsed.map((p) => ({
    segmentId: p.segmentId,
    startMs: Math.max(0, p.startAbs - base),
  }));

  // 4) endMs 채우기 (다음 시작 = end, 마지막은 무한대)
  const segs: FocusSegment[] = [];
  for (let i = 0; i < rel.length; i++) {
    const cur = rel[i];
    const next = rel[i + 1];
    const endMs = next
      ? Math.max(cur.startMs, next.startMs) // 동시간 중복 보호
      : Number.MAX_SAFE_INTEGER;
    segs.push({ segmentId: cur.segmentId, startMs: cur.startMs, endMs });
  }

  const normalized = normalizeSegmentsToFirst(segs);

  return normalized;
};

export default buildFocusSegments;
