import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// TODO: BE 구현 후에 Optional 전부 제거하기
interface User {
  id?: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
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
              } else {
                state.user = { accessToken };
              }
            }),
          setRefreshToken: (refreshToken) =>
            set((state) => {
              if (state.user) {
                state.user.refreshToken = refreshToken;
              } else {
                state.user = { refreshToken };
              }
            }),
          setWorkspaceIdList: (workspaceIdList) =>
            set((state) => {
              if (state.user) {
                state.user.workspaceIdList = workspaceIdList;
              } else {
                // TODO: 오용을 방지하기 위해 추가된 부분, 추후 수정 필요
                throw new Error('ERROR: USER NOT SET IN AUTH STORE');
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
