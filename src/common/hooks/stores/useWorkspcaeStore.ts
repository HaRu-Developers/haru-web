import { useShallow } from 'zustand/shallow';

import WorkspaceStoreState from '@common/stores/workspace-store';

export const useWorkspaceInfo = () =>
  WorkspaceStoreState(
    useShallow((state) => ({
      title: state.title,
      imageUrl: state.imageUrl,
      members: state.members,
    })),
  );

export const useWorkspaceActions = () => WorkspaceStoreState((state) => state.actions);
