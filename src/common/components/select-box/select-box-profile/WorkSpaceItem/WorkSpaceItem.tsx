import Link from 'next/link';

import { WorkSpaceItemProps } from './WorkSpaceItem.types';

const SelectBoxProfileItem = ({ id, name }: WorkSpaceItemProps) => {
  // 임시 주소
  const linkHref = `/workspace/${id}`;

  return (
    <Link
      href={linkHref}
      className="text-b3-rg cursor-pointeritems-start flex h-8 flex-col justify-center gap-2.5 self-stretch rounded-[10px] bg-white p-2.5 hover:bg-gray-600"
    >
      {name}
    </Link>
  );
};

export default SelectBoxProfileItem;
