import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routes.types';

import SnsEventAssistantSearchModal from '../../@modal/(.)search/page';
import SnsEventAssistantDefaultPage from '../../page';

const SnsEventAssistantSearchStandalonePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<SearchParamsType>;
}) => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <SnsEventAssistantSearchModal />
      </Suspense>
      <SnsEventAssistantDefaultPage params={params} searchParams={searchParams} />
    </>
  );
};

export default SnsEventAssistantSearchStandalonePage;
