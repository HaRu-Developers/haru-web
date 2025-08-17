'use client';

import { ROUTES } from '@common/constants/routes.constants';

import useStandaloneModalRedirect from '@common/hooks/useStandaloneModalRedirect';

const ChangePasswordStandalonePage = () => {
  useStandaloneModalRedirect((workspaceId) => ROUTES.WORKSPACE_MAIN(workspaceId), {
    useBack: false,
  });

  return null; // 화면 표시 없음
};

export default ChangePasswordStandalonePage;
