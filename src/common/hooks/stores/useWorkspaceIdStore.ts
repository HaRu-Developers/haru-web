import { useShallow } from 'zustand/shallow';

import WorkspaceIdStoreState from '@common/stores/workspace-id-store';

export const useWorkspaceIdStore = () =>
  WorkspaceIdStoreState(
    useShallow((state) => ({
      workspaceId: state.workspaceId,
    })),
  );

export const useWorkspaIdActions = () => WorkspaceIdStoreState((state) => state.actions);
