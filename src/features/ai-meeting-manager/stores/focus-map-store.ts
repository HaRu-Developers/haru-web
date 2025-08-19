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
  focusQuestionBySpeech: (segmentId: number, opts?: FocusOptions) => void;
};

export type FocusMapState = {
  speechRefs: Map<number, El>;
  questionRefs: Map<number, HTMLElement[]>;
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
      speechRefs: new Map<string, El>(),
      questionRefs: new Map<string, HTMLElement[]>(),

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
          console.log('focusSpeech', segmentId);
          const el = get().speechRefs.get(segmentId) ?? null;
          flash(el, opts);
        },

        focusQuestionBySpeech: (segmentId, opts) => {
          console.log('focusQuestionBySpeech', segmentId);
          const el = get().questionRefs.get(segmentId)?.[0] ?? null;
          flash(el, opts);
        },
      },
    }),
    { name: 'ai-meeting-manager/focus-map' },
  ),
);

export default useFocusMapStore;
