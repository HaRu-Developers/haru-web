import { Suspense } from 'react';

import { LeftTabType } from '@features/ai-meeting-assistant/constants/tabs';

import LeftPanel from '@features/ai-meeting-assistant/components/panels/LeftPanel/LeftPanel.server';
import RightPanel from '@features/ai-meeting-assistant/components/panels/RightPanel/RightPanel.client';
import LeftTab from '@features/ai-meeting-assistant/components/tabs/LeftTab/LeftTab.client';
import RightTab from '@features/ai-meeting-assistant/components/tabs/RightTab/RightTab.client';

const TestPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { leftTab } = await searchParams;

  const formattedLeftTab =
    typeof leftTab === 'string' && Object.values(LeftTabType).includes(leftTab as LeftTabType)
      ? (leftTab as LeftTabType)
      : LeftTabType.AiNotes; // 기본값

  return (
    <div className="flex gap-4">
      {/* TODO: 로딩 UI를 어느 단위로 처리할지 결정 필요 */}
      <div>
        <Suspense fallback={<div>탭 로딩 중...</div>}>
          <LeftTab current={formattedLeftTab} />
        </Suspense>
        <Suspense fallback={<div>패널 로딩 중...</div>}>
          <LeftPanel tab={formattedLeftTab} />
        </Suspense>
      </div>
      <div>
        <RightTab />
        <RightPanel />
      </div>
    </div>
  );
};
export default TestPage;
