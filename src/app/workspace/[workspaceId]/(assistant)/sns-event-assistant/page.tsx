import { FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';
import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';
import { SearchParamsType } from '@common/types/routes.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';
import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileSnsEventAssistantLinkWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantLinkWrapper/ListFileSnsEventAssistantLinkWrapper.client';
import ListFileSnsEventAssistantWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantWrapper/ListFileSnsEventAssistantWrapper.client';

const SnsEventAssistantDefaultPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) => {
  const { snsGnbTab } = await searchParams;

  const formattedSnsGnbTab = parseEnumOr404(snsGnbTab, SnsGnbTabType, SnsGnbTabType.ALL_EVENTS);

  return (
    <section>
      <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={formattedSnsGnbTab} />
      <div className="assistant-wrapper">
        {formattedSnsGnbTab === SnsGnbTabType.ALL_EVENTS ? (
          <>
            {/* cta 부분 */}
            {getCtaDescription(FileType.SNS_EVENT_ASSISTANT)}
            <TextCtaWrapper fileType={FileType.SNS_EVENT_ASSISTANT} />
            {/* 리스트 부분 */}
            {getListTitle(FileType.SNS_EVENT_ASSISTANT)}
            <ListHeader fileType={FileType.SNS_EVENT_ASSISTANT} />
            <ListFileSnsEventAssistantWrapper />
          </>
        ) : (
          <>
            {/* 리스트 부분 */}
            {getListTitle(SNS_EVENT_ASSISTANT_LINK)}
            <ListHeader fileType={SNS_EVENT_ASSISTANT_LINK} />
            <ListFileSnsEventAssistantLinkWrapper />
          </>
        )}
      </div>
    </section>
  );
};

export default SnsEventAssistantDefaultPage;
