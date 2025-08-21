import type { Speech, UiQuestion } from '../types/meeting.types';

// 텍스트 정규화: 공백/대소문자
export const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

export type Question = { questionId: number; question: string };

// 문자열[] | Question[] → Question[] + 중복 제거
export const ensureQuestionObjects = (() => {
  let qid = 1;
  return (qs: Array<string | Question>): Question[] => {
    const mapped = qs.map((q) => (typeof q === 'string' ? { questionId: qid++, question: q } : q));
    const seen = new Set<string>();
    const dedup: Question[] = [];
    for (const q of mapped) {
      const key = norm(q.question);
      if (!seen.has(key)) {
        seen.add(key);
        dedup.push(q);
      }
    }
    return dedup;
  };
})();

/** 질문들 합치기 */
export const mergeQuestions = (prev: Question[], next: Question[]) => {
  const seen = new Set(prev.map((q) => norm(q.question)));
  const merged = prev.slice();
  for (const q of next) {
    const key = norm(q.question);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(q);
    }
  }
  return merged;
};

// ===== 셀렉터 - 파생 데이터 만들기
/**
 *  UI용 질문 리스트: [{ speechId, text }]
 */
export const selectQuestionsForUI = (speeches: Speech[]) => {
  const out: UiQuestion[] = [];
  for (const s of speeches) {
    const qs = s.aiQuestions ?? [];
    for (const q of qs) {
      out.push({
        id: q.questionId, // ensureQuestionObjects에서 보장
        segmentId: s.segmentId,
        text: q.question,
      });
    }
  }
  return out;
};

// segmentId -> text 매핑
export const selectSpeechTextById = (speeches: Speech[]) => {
  const m: Record<number, string> = {};
  for (const s of speeches) m[s.segmentId] = s.text ?? '추천 질문 없음';
  return m;
};
