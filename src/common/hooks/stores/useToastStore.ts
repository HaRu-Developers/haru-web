import { useShallow } from 'zustand/shallow';

import toastStoreState from '@common/stores/toastStore';

export const useToastInfo = () =>
  toastStoreState(
    useShallow((state) => ({
      toastList: state.toastList,
    })),
  );

export const useToastActions = () => toastStoreState((state) => state.actions);
