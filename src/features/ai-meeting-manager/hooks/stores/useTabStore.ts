import { useShallow } from 'zustand/shallow';

import tabStore from '@features/ai-meeting-manager/stores/tab-store';

export const useTabInfo = () =>
  tabStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

export const useTabActions = () => tabStore((state) => state.actions);
