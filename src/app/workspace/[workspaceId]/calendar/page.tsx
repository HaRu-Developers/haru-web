import { workspaceIdTypes } from '@common/types/workspace-id.types';

import CalendarSection from '@common/components/etc/calendar/CalendarSection/CalendarSection.client';

/*
 * 캘린더 페이지 컴포넌트
 */
const CalendarPage = async ({ params }: workspaceIdTypes) => {
  const { workspaceId } = await params;
  return <CalendarSection workspaceId={Number(workspaceId)} />;
};

export default CalendarPage;
