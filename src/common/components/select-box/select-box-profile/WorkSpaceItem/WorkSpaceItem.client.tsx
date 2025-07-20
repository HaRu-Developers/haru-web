'use client';

import Link from 'next/link';

import WorkspaceProfileImage from '@common/components/images/WorkspaceProfileImage/WorkspaceProfileImage.client';

import { WorkSpaceItemProps } from './WorkSpaceItem.types';

const SelectBoxProfileItem = ({ workspaceId, imagePath, title }: WorkSpaceItemProps) => {
  // 임시 주소
  const linkHref = `/workspace/${workspaceId}`;

  return (
    <Link
      href={linkHref}
      className="gap-6pxr text-b3-rg h-32pxr rounded-10pxr p-10pxr flex cursor-pointer items-center bg-white hover:bg-gray-600"
    >
      <WorkspaceProfileImage src={imagePath} title={title} className="w-18pxr h-18pxr" />
      <p>{title}</p>
    </Link>
  );
};

export default SelectBoxProfileItem;
