import { Suspense } from 'react';

import SettingModalPage from '../../@aiMeetingManagerModal/(.)settings/page';

const SettingsStandalonePage = ({ params }: { params: Promise<{ workspaceId?: string }> }) => {
  return (
    <>
      <Suspense fallback={<div>로딩중...</div>}>
        <SettingModalPage />
      </Suspense>
    </>
  );
};

export default SettingsStandalonePage;
