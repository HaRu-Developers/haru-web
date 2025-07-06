import { Suspense } from 'react';

import {
  AiMeetingAssistantLeftTabType,
  AiMeetingAssistantRightTabType,
} from '@features/ai-meeting-assistant/constants/tabs';

import AiMeetingAssistantLeftPanel from '@features/ai-meeting-assistant/components/panels/AiMeetingAssistantLeftPanel/AiMeetingAssistantLeftPanel.server';
import AiMeetingAssistantRightPanel from '@features/ai-meeting-assistant/components/panels/AiMeetingAssistantRightPanel/AiMeetingAssistantRightPanel.client';
import AiMeetingAssistantLeftTab from '@features/ai-meeting-assistant/components/tabs/AiMeetingAssistantLeftTab/AiMeetingAssistantLeftTab.client';
import AiMeetingAssistantRightTab from '@features/ai-meeting-assistant/components/tabs/AiMeetingAssistantRightTab/AiMeetingAssistantRightTab.client';

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { leftTab } = await searchParams;

  const formattedLeftTab =
    typeof leftTab === 'string' &&
    Object.values(AiMeetingAssistantLeftTabType).includes(leftTab as AiMeetingAssistantLeftTabType)
      ? (leftTab as AiMeetingAssistantLeftTabType)
      : AiMeetingAssistantLeftTabType.AiNotes; // 기본값

  return (
    <div className="flex gap-4">
      {/* TODO: 로딩 UI를 어느 단위로 처리할지 결정 필요 */}
      <div>
        <Suspense fallback={<div>탭 로딩 중...</div>}>
          <AiMeetingAssistantLeftTab current={formattedLeftTab} />
        </Suspense>
        <Suspense fallback={<div>패널 로딩 중...</div>}>
          <AiMeetingAssistantLeftPanel tab={formattedLeftTab} />
        </Suspense>
      </div>
      <div>
        <AiMeetingAssistantRightTab />
        <AiMeetingAssistantRightPanel />
      </div>
    </div>
  );
};
export default TestPage;
