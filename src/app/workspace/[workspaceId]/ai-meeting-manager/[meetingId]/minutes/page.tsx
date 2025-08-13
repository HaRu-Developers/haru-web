import { SearchParamsType } from '@common/types/routes.types';

import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import { LeftTabType } from '@features/ai-meeting-manager/components/LeftTab/LeftTab.types';
import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';
import UtterancePanel from '@features/ai-meeting-manager/components/UtterancePanel/UtterancePanel.server';
import RightPanel from '@features/ai-meeting-manager/components/panels/RightPanel/RightPanel.client';

const AiMeetingMinutesPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const { leftTab } = await searchParams;
  const formattedLeftTab = parseEnumOr404(leftTab, LeftTabType, LeftTabType.MEETING_SUMMARY);
  const isVoiceLogTab = leftTab === LeftTabType.MEETING_VOICE_LOG;
  return (
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <MeetingHeader />
        <LeftTab current={formattedLeftTab} />
        {isVoiceLogTab && <UtterancePanel page={AiMeetingPageType.MINUTES} />}
      </div>
      {isVoiceLogTab && <RightPanel />}
    </div>
  );
};

export default AiMeetingMinutesPage;
