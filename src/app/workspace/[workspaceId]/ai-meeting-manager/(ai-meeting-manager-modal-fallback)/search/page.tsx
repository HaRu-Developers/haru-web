import { Suspense } from 'react';

import AiMeetingMAnagerSearchModal from '../../@aiMeetingManagerModal/(.)search/page';
import AiMeetingManagerDefaultPage from '../../page';

const AiMeetingManagerSearchStandalonePage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <AiMeetingMAnagerSearchModal />
      </Suspense>
      <AiMeetingManagerDefaultPage params={params} />
    </>
  );
};

export default AiMeetingManagerSearchStandalonePage;
