import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SpeechQuestionStoreState {
  isFetching: boolean;
  actions: {
    setIsFetching: (val: boolean) => void;
  };
}

/**
 * 회의 발화,질문 관련 store
 * */
const speechQuestionStore = create<SpeechQuestionStoreState>()(
  devtools(
    immer((set) => ({
      isFetching: false,
      actions: {
        setIsFetching: (val) =>
          set((s) => {
            s.isFetching = val;
          }),
      },
    })),
    { name: 'ai-meeting-manager/speechQuestionStore' },
  ),
);

export default speechQuestionStore;
