import Link from 'next/link';

import LeftGnbIcons from '@icons/LeftGnbIcons/LeftGnbIcons';
import { LeftGnbIconsState } from '@icons/LeftGnbIcons/LeftGnbIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import { RecentDocumentItemProps } from './RecentDocumentItem.types';

const RecentDocumentItem = ({
  workspaceId,
  documentType,
  documentId,
  title,
}: RecentDocumentItemProps) => {
  const href = ROUTES.BUILD_DOCUMENT_ROUTE(workspaceId, documentType, documentId);

  if (!href) return null;

  return (
    <Link
      href={href}
      className="h-34pxr rounded-9pxr flex cursor-pointer items-center gap-2 self-stretch px-3 py-1.5"
    >
      <LeftGnbIcons state={LeftGnbIconsState.RECENT_FILE} />
      <span className="text-b3-rg text-gray-200">{title}</span>
    </Link>
  );
};

export default RecentDocumentItem;
