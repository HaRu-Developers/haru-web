import { useShallow } from 'zustand/shallow';

import UserStoreState from '@common/stores/user-store';

export const useUserInfo = () =>
  UserStoreState(
    useShallow((state) => ({
      name: state.name,
      password: state.password,
    })),
  );

export const useUserActions = () => UserStoreState((state) => state.actions);
