'use client';

import { useParams } from 'next/navigation';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs.constants';

import useFetchRecentDocuments from '@common/hooks/queries/gnb-left/useFetchRecentDocuments';

import NavItem from './NavItem/NavItem.client';
import RecentDocumentItem from './RecentDocumentItem/RecentDocumentItem.server';
import RecentDocumentItemSkeleton from './RecentDocumentItem/RecentDocumentItemSkeleton.server';
import WorkSpaceProfile from './WorkspaceProfile/WorkspaceProfile.client';

const GnbLeft = () => {
  const params = useParams<{ workspaceId?: string }>();
  const workspaceId = params.workspaceId ? Number(params.workspaceId) : null;

  const { data, isLoading, isError, error } = useFetchRecentDocuments(workspaceId);

  if (isError && error) {
    throw error; // 클라이언트 사이드 오류 Next.js error.tsx로 넘김
  }

  const recentDocuments = data?.result?.documents ?? [];

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons
        state={HaruLogoIconsState.MIXED}
        className="w-99pxr h-24pxr mb-8pxr mt-5pxr ml-5pxr"
      />
      <div className="gap-16pxr flex flex-col">
        <WorkSpaceProfile />
        <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
          {GnbLeftNavItems.map((item) => (
            <NavItem key={item} item={item} workspaceId={workspaceId} />
          ))}
        </div>
        <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
      </div>
      <h4 className="text-cap1-md mt-12pxr mb-6pxr ml-12pxr cursor-default text-gray-400">
        recent
      </h4>
      <div className="w-210pxr flex flex-col items-start gap-1">
        {isLoading &&
          Array.from({ length: 5 }).map((_, idx) => <RecentDocumentItemSkeleton key={idx} />)}

        {!isLoading && recentDocuments.length === 0 && (
          <p className="text-b3-rg mt-5pxr ml-12pxr text-gray-400">최근 문서가 없습니다.</p>
        )}

        {!isLoading &&
          recentDocuments.length > 0 &&
          recentDocuments.map((doc) => (
            <RecentDocumentItem
              key={doc.documentId}
              workspaceId={workspaceId}
              documentId={doc.documentId}
              documentType={doc.documentType}
              title={doc.title}
            />
          ))}
      </div>
    </div>
  );
};

export default GnbLeft;
