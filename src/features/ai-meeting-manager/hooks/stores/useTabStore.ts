import { useShallow } from 'zustand/shallow';

import tabStoreState from '@features/ai-meeting-manager/stores/tabStore';

export const useTabInfo = () =>
  tabStoreState(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

export const useTabActions = () => tabStoreState((state) => state.actions);
