import type { ProceedingSection } from '@features/ai-meeting-manager/types/proceeding.types';

const H_RE = /^\s*(\d+)\.\s+(.*)$/; // "1. 제목"
const LI_RE = /^\s*[-]\s+(.*)$/; // "- 항목"

export const normalizeSections = (list: ProceedingSection[]) =>
  list.map((s) => ({ ...s, items: s.items.length ? s.items : [''] }));

/**
 * parseProceeding string을 ProceedingSection 형태로 바꾸는 함수
 */
export const parseProceeding = (raw: string) => {
  const lines = raw.split(/\r?\n/);
  const out: ProceedingSection[] = [];
  let cur: ProceedingSection | null = null;

  for (const line of lines) {
    const h = H_RE.exec(line);
    if (h) {
      // 섹션 시작
      if (cur) out.push(cur);
      cur = { title: h[2], items: [] }; // 번호는 버리고 제목만
      continue;
    }
    const li = LI_RE.exec(line);
    if (li && cur) {
      // 항목 추가
      cur.items.push(li[1]);
      continue;
    }
    // 빈 줄/기타는 무시
  }
  if (cur) out.push(cur);

  // 최소 1 섹션, 섹션당 최소 1 불렛
  if (out.length === 0) return [{ title: '', items: [''] }];
  for (const s of out) if (s.items.length === 0) s.items = [''];

  return out;
};

/**
 * ProceedingSection[] → 마크다운 스타일 문자열
 * - 번호는 1부터 재부여
 * - 불렛은 "- " prepix로 직렬화
 */
export const stringifyProceeding = (sections: ProceedingSection[]): string =>
  sections
    .map((s, i) => {
      const title = `${i + 1}. ${s.title ?? ''}`;
      const items = (s.items ?? []).map((it) => `- ${it ?? ''}`);
      return [title, ...items].join('\n');
    })
    .join('\n');

/**
 * 포커스/DOM ref 식별용 키 유틸
 * - 제목 input: t-{secIdx}
 * - 아이템 input: i-{secIdx}-{itemIdx}
 */
export const keyOfTitle = (secIdx: number): string => `t-${secIdx}`;
export const keyOfItem = (secIdx: number, itemIdx: number): string => `i-${secIdx}-${itemIdx}`;

/**
 * 마지막 불렛용 키(섹션 단위)
 */
export const enterKeyForItem = (secs: ProceedingSection[], secIdx: number, itemIdx: number) =>
  isLastItem(secs, secIdx, itemIdx) ? `sec-${secIdx}-last` : keyOfItem(secIdx, itemIdx);

/**
 * 마지막 Enter 입력 정보를 기억해서 "연속 Enter"를 판정
 * - windowMs: 더블 엔터 인정 시간 창(기본 600ms)
 */
export type LastEnterTracker = {
  isDoubleEnter: (key: string, windowMs?: number) => boolean;
  reset: () => void;
};

export const createLastEnterTracker = (): LastEnterTracker => {
  let last: { key: string; when: number } | null = null;

  const isDoubleEnter = (key: string, windowMs = 600): boolean => {
    const now = Date.now();
    const ok = !!last && last.key === key && now - last.when < windowMs;
    last = { key, when: now };
    return ok;
  };

  const reset = () => {
    last = null;
  };

  return { isDoubleEnter, reset };
};

/** 해당 불렛이 섹션의 "마지막 불렛"인지 여부 */
export const isLastItem = (secs: ProceedingSection[], secIdx: number, itemIdx: number): boolean => {
  const items = secs[secIdx]?.items ?? [];
  return itemIdx === items.length - 1;
};

// ---- 방향키로 포커스
// 커서 위치 유틸
export const isAtHead = (el: HTMLInputElement) => el.selectionStart === 0 && el.selectionEnd === 0;
export const isAtTail = (el: HTMLInputElement) => {
  const len = el.value.length;
  const s = el.selectionStart ?? 0;
  const e = el.selectionEnd ?? 0;
  return s === len && e === len;
};
