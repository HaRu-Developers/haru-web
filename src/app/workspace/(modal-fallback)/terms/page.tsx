import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routes.types';

import MainWithoutWorkspaceLayout from '../../(without-workspace)/(main)/layout';
import MainWithoutWorkspacePage from '../../(without-workspace)/(main)/page';
import TermsModalPage from '../../@modal/(.)terms/page';

// 새로고침이나 직접 접근 시에도 TermsModalPage를 재활용
const TermsStandalonePage = ({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId?: string }>;
  searchParams: Promise<SearchParamsType>;
}) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <TermsModalPage searchParams={searchParams} />
      </Suspense>
      <MainWithoutWorkspaceLayout params={params}>
        <MainWithoutWorkspacePage />
      </MainWithoutWorkspaceLayout>
    </>
  );
};

export default TermsStandalonePage;
