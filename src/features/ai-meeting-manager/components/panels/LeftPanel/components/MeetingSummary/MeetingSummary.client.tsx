'use client';

import { useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

const MeetingSummary = () => {
  const { isEditing } = useTabInfo();

  return <div>AI 회의록 내용 {isEditing && '수정 중'}</div>;
};
export default MeetingSummary;
