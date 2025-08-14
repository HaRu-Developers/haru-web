import { useShallow } from 'zustand/shallow';

import listStore from '@features/ai-meeting-manager/stores/list-store';

export const useListInfo = () =>
  listStore(
    useShallow((state) => ({
      isCheckMode: state.isCheckMode,
      checkedIds: state.checkedIds,
      isAnyChecked: state.isAnyChecked,
    })),
  );

export const useListActions = () => listStore((state) => state.actions);
