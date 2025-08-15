import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useGetUserInfo } from '@api/user/hooks/queries/useGetUserInfo';

// TODO: BE 구현 후에 Optional 전부 제거하기
interface User {
  id?: string;
  name?: string;
  email?: string;
  imageUrl?: string | null;
  accessToken?: string;
  refreshToken?: string;
  workspaceIdList?: string[];
}

interface AuthStoreState {
  user: User | null;
  actions: {
    setUser: (newUser: User) => void;
    setUserId: (userId: string) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setWorkspaceIdList: (workspaceIdList: string[]) => void;
    clearTokens: () => void;
  };
}

const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      immer((set) => ({
        user: null,
        actions: {
          setUser: (newUser: User) =>
            set((state) => {
              state.user = { ...state.user, ...newUser };
              // 상태가 null인 경우에도 새로운 유저 정보를 설정할 수 있도록 함
            }),
          setUserId: (userId) =>
            set((state) => {
              if (state.user) {
                state.user.id = userId;
              } else {
                state.user = { id: userId };
              }
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
          clearTokens: () => {
            set((state) => {
              if (state.user) {
                state.user.accessToken = undefined;
                state.user.refreshToken = undefined;
              }
            });
          },
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
