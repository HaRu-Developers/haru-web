import { redirect } from 'next/navigation';

import { ROUTES } from '@common/constants/routes.constants';

/**
 * 새로 고침시 메인으로 리다이렉트 해 모달 제거
 */
const ConfirmDeleteStandalonePage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  redirect(ROUTES.AI_MEETING_MANAGER.BASE(workspaceId));
};

export default ConfirmDeleteStandalonePage;
