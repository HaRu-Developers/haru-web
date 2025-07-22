import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@common/constants/routes.constants';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';

import { RecentWorkspaceProps } from './RecentWorkspace.types';

const RecentWorkspace = ({ workspaceId, imagePath, title, isOwner }: RecentWorkspaceProps) => {
  return (
    <Link
      href={ROUTES.WORKSPACE(workspaceId)}
      className="h-34pxr rounded-9pxr flex cursor-pointer items-center gap-2 self-stretch px-3 py-1.5"
    >
      <WorkspaceProfileImage src={imagePath} title={title} className="w-20pxr h-20pxr" />
      <span className="text-b3-rg text-gray-200">{title}</span>
    </Link>
  );
};

export default RecentWorkspace;
