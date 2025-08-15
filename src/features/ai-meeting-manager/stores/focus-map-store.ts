import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
  registerSpeechRef: (speechId: string, el: El) => void;
  unregisterSpeechRef: (speechId: string, el?: El) => void;

  registerQuestionRef: (speechId: string, el: El) => void;
  unregisterQuestionRef: (speechId: string, el?: El) => void;

  focusSpeech: (speechId: string, opts?: FocusOptions) => void;
  focusQuestionBySpeech: (speechId: string, opts?: FocusOptions) => void;
};

export type FocusMapState = {
  speechRefs: Map<string, El>;
  questionRefs: Map<string, HTMLElement[]>; // 질문 쪽은 null 저장 안 함
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
  window.setTimeout(() => el.classList.remove(FLASH_CLASS), opts?.flashMs ?? 1200);
};

const useFocusMapStore = create<FocusMapState>()(
  devtools(
    (set, get) => ({
      speechRefs: new Map<string, El>(),
      questionRefs: new Map<string, HTMLElement[]>(),

      actions: {
        registerSpeechRef: (speechId, el) =>
          set((state) => {
            const next = new Map(state.speechRefs);
            next.set(String(speechId), el ?? null);
            return { speechRefs: next };
          }),

        unregisterSpeechRef: (speechId) =>
          set((state) => {
            const next = new Map(state.speechRefs);
            next.delete(String(speechId));
            return { speechRefs: next };
          }),

        registerQuestionRef: (speechId, el) =>
          set((state) => {
            const key = String(speechId);
            const next = new Map(state.questionRefs);
            const arr = next.get(key) ? [...next.get(key)!] : [];
            if (el && !arr.includes(el)) arr.push(el);
            next.set(key, arr);
            return { questionRefs: next };
          }),

        unregisterQuestionRef: (speechId, el) =>
          set((state) => {
            const key = String(speechId);
            const next = new Map(state.questionRefs);
            if (!el) {
              next.delete(key);
            } else {
              const arr = next.get(key);
              if (arr)
                next.set(
                  key,
                  arr.filter((x) => x !== el),
                );
            }
            return { questionRefs: next };
          }),

        focusSpeech: (speechId, opts) => {
          const el = get().speechRefs.get(String(speechId)) ?? null;
          flash(el, opts);
        },

        focusQuestionBySpeech: (speechId, opts) => {
          const el = get().questionRefs.get(String(speechId))?.[0] ?? null;
          flash(el, opts);
        },
      },
    }),
    { name: 'ai-meeting-manager/focus-map' },
  ),
);

export default useFocusMapStore;
