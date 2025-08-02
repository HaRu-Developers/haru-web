'use client';

import useFetchRecentDocuments from '@common/hooks/queries/gnb-left/useFetchRecentDocuments';

import RecentDocumentItem from '../RecentDocumentItem/RecentDocumentItem.server';
import RecentDocumentItemSkeleton from '../RecentDocumentItem/RecentDocumentItemSkeleton.server';
import { RecentDocumentsSectionProps } from './RecentDocumentsSection.types';

const RecentDocumentsSection = ({ workspaceId }: RecentDocumentsSectionProps) => {
  const { isPending, extra: recentDocuments } = useFetchRecentDocuments(workspaceId);

  return (
    <>
      <h4 className="text-cap1-md mt-12pxr mb-6pxr ml-12pxr cursor-default text-gray-400">
        recent
      </h4>
      <div className="w-210pxr flex flex-col items-start gap-1">
        {isPending &&
          Array.from({ length: 5 }).map((_, idx) => <RecentDocumentItemSkeleton key={idx} />)}

        {recentDocuments?.length === 0 && (
          <p className="text-b3-rg mt-5pxr ml-12pxr text-gray-400">최근 문서가 없습니다.</p>
        )}

        {recentDocuments?.map((doc) => (
          <RecentDocumentItem
            key={doc.documentId}
            workspaceId={workspaceId}
            documentId={doc.documentId}
            documentType={doc.documentType}
            title={doc.title}
          />
        ))}
      </div>
    </>
  );
};

export default RecentDocumentsSection;
