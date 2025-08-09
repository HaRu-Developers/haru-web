import { Suspense } from 'react';

import AiMeetingManagerSearchModal from '../../@modal/(.)search/page';
import AiMeetingManagerDefaultPage from '../../page';

const AiMeetingManagerSearchStandalonePage = () => {
  return (
    <>
      <Suspense fallback={<div>검색 모달 로딩중...</div>}>
        <AiMeetingManagerSearchModal />
      </Suspense>
      <AiMeetingManagerDefaultPage />
    </>
  );
};

export default AiMeetingManagerSearchStandalonePage;
