import Image from 'next/image';
import Link from 'next/link';

import FixedSizeImage from '@common/components/FixedSizeImage/FixedSizeImage.server';

import { WorkSpaceItemProps } from './WorkSpaceItem.types';

const SelectBoxProfileItem = ({ workspaceId, imagePath, title }: WorkSpaceItemProps) => {
  // 임시 주소
  const linkHref = `/workspace/${workspaceId}`;

  return (
    <Link
      href={linkHref}
      className="gap-6pxr text-b3-rg h-32pxr rounded-10pxr p-10pxr flex cursor-pointer items-center bg-white hover:bg-gray-600"
    >
      <FixedSizeImage
        alt={`${title} 워크스페이스 프로필 이미지`}
        src={imagePath}
        className="w-18pxr h-18pxr"
      />
      <p>{title}</p>
    </Link>
  );
};

export default SelectBoxProfileItem;
