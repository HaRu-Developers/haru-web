'use client';

import NewEventPage from '../../@snsEventAssistantGeneralModal/(.)new-event/page';
import { Suspense } from 'react';
import MainWithSnsPage from '@app/workspace/[workspaceId]/(assistant)/sns-event-assistant/page';
import { useParams } from 'next/navigation';
import { SearchParamsType } from '@common/types/routes.types';

const NewEventStandalonePage = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <NewEventPage />
      </Suspense>
      <MainWithSnsPage
        params={Promise.resolve({ workspaceId })}
        searchParams={Promise.resolve({} as SearchParamsType)}
      />
    </>
  );
}

export default NewEventStandalonePage;
