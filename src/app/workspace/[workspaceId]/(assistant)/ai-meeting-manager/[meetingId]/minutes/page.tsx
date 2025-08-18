import { SearchParamsType } from '@common/types/routes.types';

import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import AiMeetingMinutesClient from '@features/ai-meeting-manager/components/AiMeetingMinutesClient/AiMeetingMinutesClient.client';
import { LeftTabType } from '@features/ai-meeting-manager/components/LeftTab/LeftTab.types';

const AiMeetingMinutesPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const { leftTab } = await searchParams;
  const formattedLeftTab = parseEnumOr404(leftTab, LeftTabType, LeftTabType.MEETING_PROCEEDING);
  const isVoiceLogTab = leftTab === LeftTabType.MEETING_VOICE_LOG;

  return (
    <AiMeetingMinutesClient formattedLeftTab={formattedLeftTab} isVoiceLogTab={isVoiceLogTab} />
  );
};

export default AiMeetingMinutesPage;
