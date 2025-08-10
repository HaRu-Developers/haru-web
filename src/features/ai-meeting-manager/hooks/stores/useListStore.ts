import { useShallow } from 'zustand/shallow';

import listStoreState from '@features/ai-meeting-manager/stores/listStore';

export const useListInfo = () =>
  listStoreState(
    useShallow((state) => ({
      isCheckMode: state.isCheckMode,
      checkedIds: state.checkedIds,
      isAnyChecked: state.isAnyChecked,
    })),
  );

export const useListActions = () => listStoreState((state) => state.actions);
