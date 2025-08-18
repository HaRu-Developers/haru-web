'use client';

import { ROUTES } from '@common/constants/routes.constants';

import useStandaloneModalRedirect from '@common/hooks/useStandaloneModalRedirect';

const SettingsStandalonePage = () => {
  useStandaloneModalRedirect((workspaceId) => ROUTES.WORKSPACE_MAIN(workspaceId));

  return null; // 화면 표시 없음
};

export default SettingsStandalonePage;
