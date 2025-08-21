import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface WorkspaceStoreState {
  workspaceId: string;
  actions: {
    setWorkspaceId: (workspaceId: string) => void;
  };
}

const workspaceStore = create<WorkspaceStoreState>()(
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
);

export default workspaceStore;
