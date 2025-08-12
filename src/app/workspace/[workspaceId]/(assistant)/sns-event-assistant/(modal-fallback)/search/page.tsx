import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routes.types';

import SnsEventAssistantSearchModal from '../../@modal/(.)search/page';
import SnsEventAssistantDefaultPage from '../../page';

const SnsEventAssistantSearchStandalonePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <SnsEventAssistantSearchModal />
      </Suspense>
      <SnsEventAssistantDefaultPage searchParams={searchParams} />
    </>
  );
};

export default SnsEventAssistantSearchStandalonePage;
