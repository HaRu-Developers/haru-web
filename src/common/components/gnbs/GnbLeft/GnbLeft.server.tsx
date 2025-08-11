import { notFound } from 'next/navigation';

import fetchMyWorkspaces from '@api/workspace/get/apis/fetchMyWorkspaces';
import fetchRecentDocuments from '@api/workspace/get/apis/fetchRecentDocuments';
import fetchWorkspaceDetail from '@api/workspace/get/apis/fetchWorkspaceDetail';
import { HydrationBoundary } from '@tanstack/react-query';

import HaruLogoIcons from '@icons/logos/HaruLogoIcons/HaruLogoIcons';
import { HaruLogoIconsState } from '@icons/logos/HaruLogoIcons/HaruLogoIcons.types';

import { GnbLeftNavItems } from '@common/constants/gnbs.constants';
import queryKeys from '@common/constants/query-key.constants';

import { getDehydratedState } from '@common/utils/dehydrate';

import { GnbLeftProps } from './GnbLeft.types';
import NavItem from './NavItem/NavItem.client';
import RecentDocumentsSection from './RecentDocumentsSection/RecentDocumentsSection.server';
import WorkSpaceProfile from './WorkspaceProfile/WorkspaceProfile.client';

const GnbLeft = async ({ workspaceId }: GnbLeftProps) => {
  // NaN이면 not-found.tsx로 이동
  if (Number.isNaN(workspaceId)) {
    notFound();
  }

  // Server Component에서 prefetch 실행
  // workspaceId가 있을 때만 prefetch
  let dehydratedState = undefined;
  if (workspaceId !== null) {
    const result = await getDehydratedState({
      prefetch: async (qc) => {
        await qc.prefetchQuery({
          queryKey: queryKeys.workspaces.detail(workspaceId).queryKey,
          queryFn: () => fetchWorkspaceDetail({ workspaceId }),
        });
        await qc.prefetchQuery({
          queryKey: queryKeys.workspaces.myWorkspaces.queryKey,
          queryFn: fetchMyWorkspaces,
        });
        await qc.prefetchQuery({
          queryKey: queryKeys.workspaces.recentDocuments(workspaceId).queryKey,
          queryFn: () => fetchRecentDocuments({ workspaceId }),
        });
      },
    });
    dehydratedState = result.dehydratedState;
  }

  return (
    <div className="border-stroke-200 p-16pxr flex w-60 shrink-0 flex-col border-r border-solid">
      <HaruLogoIcons
        state={HaruLogoIconsState.MIXED}
        className="w-99pxr h-24pxr mb-8pxr mt-5pxr ml-5pxr"
      />
      <HydrationBoundary state={dehydratedState}>
        <WorkSpaceProfile workspaceId={workspaceId} />
        <div className="gap-16pxr flex flex-col">
          <div className="rounded-10pxr flex flex-col items-start gap-2 self-stretch">
            {GnbLeftNavItems.map((item) => (
              <NavItem key={item} item={item} workspaceId={workspaceId} />
            ))}
          </div>
          <div className="bg-stroke-200 h-1pxr w-full shrink-0"></div>
        </div>
        {workspaceId != null && <RecentDocumentsSection workspaceId={workspaceId} />}
      </HydrationBoundary>
    </div>
  );
};

export default GnbLeft;
