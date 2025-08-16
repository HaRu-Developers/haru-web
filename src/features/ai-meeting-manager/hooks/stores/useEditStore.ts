import { useShallow } from 'zustand/shallow';

import editStore from '@features/ai-meeting-manager/stores/edit-store';

export const useEditInfo = () =>
  editStore(
    useShallow((state) => ({
      editing: state.editing,
      commitTick: state.commitTick,
      cancelTick: state.cancelTick,
    })),
  );

export const useEditActions = () => editStore((state) => state.actions);
