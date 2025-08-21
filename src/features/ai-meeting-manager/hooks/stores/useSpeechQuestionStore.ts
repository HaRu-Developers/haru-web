import { useShallow } from 'zustand/shallow';

import speechQuestionStore from '@features/ai-meeting-manager/stores/speech-question-store';

export const useSpeechQuestionInfo = () =>
  speechQuestionStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
    })),
  );

export const useSpeechQuestionActions = () => speechQuestionStore((state) => state.actions);
