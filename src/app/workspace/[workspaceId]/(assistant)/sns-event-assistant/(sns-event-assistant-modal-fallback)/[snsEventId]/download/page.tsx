'use client';

import DownloadEventPage from '../../../@snsEventAssistantGeneralModal/(.)[snsEventId]/download/page';
import { Suspense } from 'react';
import MainWithSnsDetailPage from '@app/workspace/[workspaceId]/(assistant)/sns-event-assistant/[snsEventId]/page';

const CreatingEventStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <DownloadEventPage />
      </Suspense>
      <MainWithSnsDetailPage />
    </>
  );
}

export default CreatingEventStandalonePage;
