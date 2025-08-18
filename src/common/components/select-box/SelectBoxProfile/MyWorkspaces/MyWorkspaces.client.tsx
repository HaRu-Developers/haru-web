'use client';

import useFetchMyWorkspaces from '@api/workspace/get/queries/useFetchMyWorkspaces';

import WorkSpaceItemSkeleton from './WorkspaceItem/WorkSpaceItemSkeleton.server';
import WorkSpaceItem from './WorkspaceItem/WorkspaceItem.server';

const MyWorkspaces = () => {
  const { isFetching, extra: workspaces } = useFetchMyWorkspaces();

  return (
    <div className="gap-3pxr max-h-210pxr scrollbar-component flex flex-col overflow-y-auto">
      {isFetching && Array.from({ length: 3 }).map((_, idx) => <WorkSpaceItemSkeleton key={idx} />)}

      {!isFetching &&
        workspaces?.map((ws) => (
          <WorkSpaceItem
            key={ws.workspaceId}
            workspaceId={ws.workspaceId}
            imageUrl={ws.imageUrl}
            title={ws.title}
            isOwner={ws.isOwner}
          />
        ))}
    </div>
  );
};

export default MyWorkspaces;
