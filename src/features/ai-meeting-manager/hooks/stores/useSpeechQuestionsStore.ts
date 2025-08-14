import { useShallow } from 'zustand/shallow';

import speechQuestionStore from '@features/ai-meeting-manager/stores/speech-question-store';

export const useSpeechQuestionInfo = () =>
  speechQuestionStore(
    useShallow((state) => ({
      map: state.map,
    })),
  );

export const useSpeechQuestionActions = () => speechQuestionStore((state) => state.actions);
