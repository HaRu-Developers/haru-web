import type { ProceedingSection } from '../types/proceeding.types';

const H_RE = /^\s*(\d+)\.\s+(.*)$/; // "1. 제목"
const LI_RE = /^\s*[-]\s+(.*)$/; // "- 항목"

const parseProceeding = (raw: string) => {
  const lines = raw.split(/\r?\n/);
  const out: ProceedingSection[] = [];
  let cur: ProceedingSection | null = null;

  for (const line of lines) {
    const h = H_RE.exec(line);
    if (h) {
      // 섹션 시작
      if (cur) out.push(cur);
      cur = { title: h[2].trim(), items: [] }; // 번호는 버리고 제목만
      continue;
    }
    const li = LI_RE.exec(line);
    if (li && cur) {
      // 항목 추가
      cur.items.push(li[1].trim());
      continue;
    }
    // 빈 줄/기타는 무시
  }
  if (cur) out.push(cur);
  return out;
};

export default parseProceeding;
