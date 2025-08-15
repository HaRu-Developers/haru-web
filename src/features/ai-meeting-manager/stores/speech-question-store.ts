import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

enableMapSet(); // Set/Map 불변 업데이트 허용 - Immer에서  Set 조작이 허용하기 위해

/**
 * 발화-질문 map
 */
type QuestionsMap = Record<string, string[]>;

/**
 * 발화-질문 전역 상태
 */
interface SpeechQuestionStoreState {
  map: QuestionsMap;
  actions: {
    setForSpeech: (speechId: string, questions: string[]) => void; // 서버가 전체 목록을 줄 때
    mergeForSpeech: (speechId: string, questions: string[]) => void; // 증분으로 올 때
    removeQuestion: (speechId: string, index: number) => void;

    clearSpeech: (speechId: string) => void;
    clearAll: () => void;
  };
}

// 질문 텍스트 정규화
const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

const speechQuestionStore = create<SpeechQuestionStoreState>()(
  devtools(
    immer((set) => ({
      map: {},
      actions: {
        setForSpeech: (speechId, questions) =>
          set((s) => {
            s.map[speechId] = questions.slice();
          }),
        mergeForSpeech: (speechId, questions) =>
          set((s) => {
            const prev = s.map[speechId] ?? [];
            const seen = new Set(prev.map(norm));
            const add = questions.filter((q) => {
              const k = norm(q);
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            });
            if (add.length) s.map[speechId] = [...prev, ...add];
          }),
        removeQuestion: (speechId, index) =>
          set((s) => {
            const curr = s.map[speechId];
            if (!curr || index < 0 || index >= curr.length) return;
            curr.splice(index, 1);
          }),
        clearSpeech: (speechId) =>
          set((s) => {
            if (s.map[speechId]) delete s.map[speechId];
          }),
        clearAll: () =>
          set((s) => {
            s.map = {};
          }),
      },
    })),
    { name: 'ai-meeting-manager/speechQuestionStore' },
  ),
);

export default speechQuestionStore;
