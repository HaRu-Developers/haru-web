import { Suspense } from 'react';

import { workspaceIdTypes } from '@common/types/workspace-id.types';

import CalendarSection from '@common/components/etc/calendar/CalendarSection/CalendarSection.client';

import SearchModalPage from '@/app/workspace/[workspaceId]/(main)/@modal/(.)search/page';

const CalendarSearchStandalonePage = async ({ params }: workspaceIdTypes) => {
  const { workspaceId } = await params;
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <SearchModalPage />
      </Suspense>
      <CalendarSection workspaceId={Number(workspaceId)} />
    </>
  );
};

export default CalendarSearchStandalonePage;
