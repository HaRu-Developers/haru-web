import Link from 'next/link';

import { WorkspaceSummary } from '@api/workspace/api.types';

import { ROUTES } from '@common/constants/routes.constants';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';

const WorkspaceItem = ({ workspaceId, imageUrl, title, isOwner }: WorkspaceSummary) => {
  return (
    <Link
      href={ROUTES.WORKSPACE_MAIN(workspaceId)}
      className="h-32pxr rounded-10pxr p-10pxr flex cursor-pointer items-center justify-between bg-white hover:bg-gray-600"
    >
      <span className="gap-6pxr flex items-center">
        <WorkspaceProfileImage
          src={imageUrl}
          title={title}
          className="w-18pxr h-18pxr text-cap2-rg"
          border
        />
        <p className="text-b3-rg text-black">{title}</p>
      </span>
      {isOwner && <p className="text-cap2-rg text-right text-gray-400">Owner</p>}
    </Link>
  );
};

export default WorkspaceItem;
