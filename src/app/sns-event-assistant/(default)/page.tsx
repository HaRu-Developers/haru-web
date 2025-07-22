import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';
import { SearchParamsType } from '@common/types/routes.types';

import parseEnum from '@common/utils/parse-enum';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

const SnsEventAssistantPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) => {
  const { snsGnbTab } = await searchParams;
  const formattedSnsGnbTab = parseEnum(snsGnbTab, SnsGnbTabType, SnsGnbTabType.ALL_EVENTS);

  return (
    <>
      <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={formattedSnsGnbTab} />
      <div className="p-10">sns 이벤트 어시스턴트 페이지</div>
    </>
  );
};

export default SnsEventAssistantPage;
