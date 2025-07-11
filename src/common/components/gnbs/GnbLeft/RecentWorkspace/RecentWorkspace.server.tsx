import Link from 'next/link';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';
import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import { Routes } from '@common/constants/routes';

import { RecentWorkspaceProps } from './RecentWorkspace.types';

const RecentWorkspace = ({ workspaceId, title, isOwner }: RecentWorkspaceProps) => {
  return (
    <Link
      href={Routes.WORKSPACE(workspaceId)}
      className="flex h-[34px] cursor-pointer items-center gap-2 self-stretch rounded-[9px] px-3 py-1.5"
    >
      <LeftGnbIcons state={LeftGnbIconsState.RECENT_FILE} />
      <span className="text-b3-rg text-gray-200">{title}</span>
    </Link>
  );
};

export default RecentWorkspace;
