import Link from 'next/link';

import { WorkSpaceItemProps } from './WorkSpaceItem.types';

const SelectBoxProfileItem = ({ workspaceId, title }: WorkSpaceItemProps) => {
  // 임시 주소
  const linkHref = `/workspace/${workspaceId}`;

  return (
    <Link
      href={linkHref}
      className="text-b3-rg cursor-pointeritems-start rounded-10pxr flex h-8 flex-col justify-center gap-2.5 self-stretch bg-white p-2.5 hover:bg-gray-600"
    >
      {title}
    </Link>
  );
};

export default SelectBoxProfileItem;
