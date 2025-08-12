import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface User {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  workspaceIdList?: string[];
}

interface AuthStoreState {
  user: User | null;
  actions: {
    setUser: (user: User | null) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setWorkspaceIdList: (workspaceIdList: string[]) => void;
  };
}

const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        actions: {
          setUser: (user) =>
            set((state) => {
              state.user = user;
            }),
          setAccessToken: (accessToken) =>
            set((state) => {
              if (state.user) {
                state.user.accessToken = accessToken;
              }
            }),
          setRefreshToken: (refreshToken) =>
            set((state) => {
              if (state.user) {
                state.user.refreshToken = refreshToken;
              }
            }),
          setWorkspaceIdList: (workspaceIdList) =>
            set((state) => {
              if (state.user) {
                state.user.workspaceIdList = workspaceIdList;
              }
            }),
        },
      })),
      {
        name: 'auth-store',
        partialize: (state) => ({
          user: state.user,
        }),
      },
    ),
  ),
);

export default useAuthStore;
