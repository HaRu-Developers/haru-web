import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: string;
  name: string;
  workspaceIdList?: number[];
}

interface AuthStoreState {
  user: User | null;
  actions: {
    setUser: (user: User | null) => void;
  };
}

const useAuthStore = create<AuthStoreState>()(
  devtools(
    immer((set) => ({
      user: null,
      actions: {
        setUser: (user) =>
          set((state) => {
            state.user = user;
          }),
      },
    })),
  ),
);

export default useAuthStore;
