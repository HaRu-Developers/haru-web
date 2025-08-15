import { useShallow } from 'zustand/shallow';

import useFocusMapStore from '@features/ai-meeting-manager/stores/focus-map-store';

export const useFocusMapInfo = () =>
  useFocusMapStore(
    useShallow((state) => ({
      speechRefs: state.speechRefs,
      questionRefs: state.questionRefs,
    })),
  );

export const useFocusMapActions = () => useFocusMapStore((state) => state.actions);
