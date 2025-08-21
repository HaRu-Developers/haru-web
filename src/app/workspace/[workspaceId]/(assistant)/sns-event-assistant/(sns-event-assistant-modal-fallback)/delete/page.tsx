'use client';

import DeleteEventPage from '../../@snsEventAssistantGeneralModal/(.)delete/page';
import { Suspense } from 'react';
import MainWithSnsPage from '@app/workspace/[workspaceId]/(assistant)/sns-event-assistant/page';
import { useParams } from 'next/navigation';
import { SearchParamsType } from '@common/types/routes.types';

const DeleteEventStandalonePage = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <DeleteEventPage />
      </Suspense>
      <MainWithSnsPage
        params={Promise.resolve({ workspaceId })}
        searchParams={Promise.resolve({} as SearchParamsType)}
      />
    </>
  );
}

export default DeleteEventStandalonePage;
