import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@common/constants/routes';

import FixedSizeImage from '@common/components/FixedSizeImage/FixedSizeImage.server';

import { RecentWorkspaceProps } from './RecentWorkspace.types';

const RecentWorkspace = ({ workspaceId, imagePath, title, isOwner }: RecentWorkspaceProps) => {
  return (
    <Link
      href={ROUTES.WORKSPACE(workspaceId)}
      className="h-34pxr rounded-9pxr flex cursor-pointer items-center gap-2 self-stretch px-3 py-1.5"
    >
      <FixedSizeImage
        alt={`${title} 워크스페이스 프로필 이미지`}
        src={imagePath}
        className="w-20pxr h-20pxr"
      />
      <span className="text-b3-rg text-gray-200">{title}</span>
    </Link>
  );
};

export default RecentWorkspace;
