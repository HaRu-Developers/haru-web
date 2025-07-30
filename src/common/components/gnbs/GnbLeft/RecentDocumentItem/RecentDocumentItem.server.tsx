import Link from 'next/link';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';
import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import { RecentDocumentItemProps } from './RecentDocumentItem.types';

const RecentWorkspace = ({ documentId, title }: RecentDocumentItemProps) => {
  return (
    <Link
      href={ROUTES.DOCUMENT(documentId)}
      className="h-34pxr rounded-9pxr flex cursor-pointer items-center gap-2 self-stretch px-3 py-1.5"
    >
      <LeftGnbIcons state={LeftGnbIconsState.RECENT_FILE} />
      <span className="text-b3-rg text-gray-200">{title}</span>
    </Link>
  );
};

export default RecentWorkspace;
