'use client';

import Link from 'next/link';

import { ROUTES } from '@common/constants/routes.constants';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';

import { WorkSpaceItemProps } from './WorkSpaceItem.types';

const SelectBoxProfileItem = ({ workspaceId, imagePath, title, isOwner }: WorkSpaceItemProps) => {
  return (
    <Link
      href={ROUTES.WORKSPACE(workspaceId)}
      className="h-32pxr rounded-10pxr p-10pxr flex cursor-pointer items-center justify-between bg-white hover:bg-gray-600"
    >
      <span className="gap-6pxr flex items-center">
        <WorkspaceProfileImage
          src={imagePath}
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

export default SelectBoxProfileItem;
