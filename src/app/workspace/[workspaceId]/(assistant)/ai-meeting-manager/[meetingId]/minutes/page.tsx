import { SearchParamsType } from '@common/types/routes.types';

import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import { LeftTabType } from '@features/ai-meeting-manager/components/LeftTab/LeftTab.types';

const AiMeetingMinutesPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
  const { leftTab } = await searchParams;
  const formattedLeftTab = parseEnumOr404(leftTab, LeftTabType, LeftTabType.MEETING_SUMMARY);
  return (
    <div>
      <LeftTab current={formattedLeftTab} />
    </div>
  );
};

export default AiMeetingMinutesPage;
