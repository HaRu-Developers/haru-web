import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type El = HTMLElement | null;

/**
 * 발화, 질문 포커스 전역 상태
 */
export type FocusOptions = {
  flashMs?: number;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
};

export type FocusActions = {
  registerSpeechRef: (segmentId: number, el: El) => void;
  unregisterSpeechRef: (segmentId: number, el?: El) => void;

  registerQuestionRef: (segmentId: number, el: El) => void;
  unregisterQuestionRef: (segmentId: number, el?: El) => void;

  focusSpeech: (segmentId: number, opts?: FocusOptions) => void;
  focusQuestionsBySpeech: (segmentId: number, opts?: FocusOptions) => void;

  clearAllFocus: () => void;
};

export type FocusMapState = {
  speechRefs: Map<number, El>;
  questionRefs: Map<number, HTMLElement[]>;
  // 현재 활성 포커스 추적
  activeSpeechSegId: number | null;
  activeQuestionSegId: number | null;
  actions: FocusActions;
};

const FLASH_CLASS = 'flash-highlight' as const;

const flash = (el: El, opts?: FocusOptions) => {
  if (!el) return;
  el.classList.add(FLASH_CLASS);
  el.scrollIntoView({
    behavior: opts?.behavior ?? 'smooth',
    block: opts?.block ?? 'center',
    inline: opts?.inline ?? 'nearest',
  });
  window.setTimeout(() => el.classList.remove(FLASH_CLASS), opts?.flashMs ?? 1000);
};

const useFocusMapStore = create<FocusMapState>()(
  devtools(
    (set, get) => ({
      speechRefs: new Map<number, El>(),
      questionRefs: new Map<number, HTMLElement[]>(),

      // 초기 활성 포커스 없음
      activeSpeechSegId: null,
      activeQuestionSegId: null,

      actions: {
        registerSpeechRef: (segmentId, el) =>
          set((state) => {
            const next = new Map(state.speechRefs);
            next.set(segmentId, el);
            return { speechRefs: next };
          }),

        unregisterSpeechRef: (segmentId) =>
          set((state) => {
            const next = new Map(state.speechRefs);
            next.delete(segmentId);
            return { speechRefs: next };
          }),

        registerQuestionRef: (segmentId, el) =>
          set((state) => {
            const next = new Map(state.questionRefs);
            const arr = next.get(segmentId) ? [...next.get(segmentId)!] : [];
            if (el && !arr.includes(el)) arr.push(el);
            next.set(segmentId, arr);
            return { questionRefs: next };
          }),

        unregisterQuestionRef: (segmentId, el) =>
          set((state) => {
            const next = new Map(state.questionRefs);
            if (!el) {
              next.delete(segmentId);
            } else {
              const arr = next.get(segmentId);
              if (arr)
                next.set(
                  segmentId,
                  arr.filter((x) => x !== el),
                );
            }
            return { questionRefs: next };
          }),

        focusSpeech: (segmentId, opts) => {
          const { activeSpeechSegId, speechRefs } = get();
          // activeSpeechSegId가 있고, 받은 segmentId와 다르면 flash 효과 제거
          if (activeSpeechSegId != null && activeSpeechSegId !== segmentId) {
            const prevEl = speechRefs.get(activeSpeechSegId) ?? null;
            if (prevEl) prevEl.classList.remove(FLASH_CLASS);
          }

          // 현재 활성 갱신
          set({ activeSpeechSegId: segmentId });

          // 받은 segmentId의 요소 플래시
          const el = get().speechRefs.get(segmentId) ?? null;
          flash(el, opts);
        },

        focusQuestionsBySpeech: (segmentId, opts) => {
          const { activeQuestionSegId, questionRefs } = get();

          // 이전 세그먼트 질문들에서 플래시 효과 제거
          if (activeQuestionSegId != null && activeQuestionSegId !== segmentId) {
            const prevList = questionRefs.get(activeQuestionSegId) ?? [];
            prevList.forEach((node) => node?.classList.remove(FLASH_CLASS));
          }

          // 현재 활성 갱신
          set({ activeQuestionSegId: segmentId });

          // ===== segmentId에 해당하는 질문 모두 포커스
          // // 새 플래시 적용
          // // 연결된 질문 카드들 모두 가져오기
          // const list = (get().questionRefs.get(segmentId) ?? []).filter(
          //   (el): el is HTMLElement => !!el,
          // );

          // if (list.length === 0) return;

          // const [first, ...rest] = list;

          // // 1) 첫 번째 카드: 스크롤 + 하이라이트
          // flash(first ?? null, opts);

          // // 2) 나머지 카드: 스크롤 없이 하이라이트만
          // const ms = opts?.flashMs ?? 1000;
          // rest.forEach((el) => {
          //   el.classList.add(FLASH_CLASS);
          //   window.setTimeout(() => el.classList.remove(FLASH_CLASS), ms);
          // });

          // ===== segmentId에 해당하는 첫번째 질문만 포커스
          const el = get().questionRefs.get(segmentId)?.[0] ?? null;
          flash(el, opts);
        },

        // 활성화 모두 해제
        clearAllFocus: () => {
          const { activeSpeechSegId, activeQuestionSegId, speechRefs, questionRefs } = get();
          if (activeSpeechSegId != null) {
            const el = speechRefs.get(activeSpeechSegId) ?? null;
            if (el) el.classList.remove(FLASH_CLASS);
          }
          if (activeQuestionSegId != null) {
            const arr = questionRefs.get(activeQuestionSegId) ?? [];
            arr.forEach((el) => el?.classList.remove(FLASH_CLASS));
          }
          set({ activeSpeechSegId: null, activeQuestionSegId: null });
        },
      },
    }),
    { name: 'ai-meeting-manager/focus-map' },
  ),
);

export default useFocusMapStore;
