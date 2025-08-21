import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface WorkspaceStoreState {
  workspaceId: string;
  actions: {
    setWorkspaceId: (workspaceId: string) => void;
  };
}

const workspaceStore = create<WorkspaceStoreState>()(
  persist(
    devtools(
      immer((set) => ({
        workspaceId: '',
        actions: {
          setWorkspaceId: (workspaceId: string) =>
            set((state) => {
              state.workspaceId = workspaceId;
            }),
        },
      })),
    ),
    {
      name: 'workspaceid-storage', // sessionStorage에 저장될 때 사용될 key 이름
      storage: createJSONStorage(() => sessionStorage), // localStorage 대신 sessionStorage 사용
      partialize: (state) => ({
        workspaceId: state.workspaceId,
      }),
    },
  ),
);

export default workspaceStore;
