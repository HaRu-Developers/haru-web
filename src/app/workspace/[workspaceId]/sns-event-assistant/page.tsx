import { FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';
import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';
import { SearchParamsType } from '@common/types/routes.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';
import parseEnumOr404 from '@common/utils/parse-enum-or-404.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileSnsEventAssistantLinkWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantLinkWrapper/ListFileSnsEventAssistantLinkWrapper.client';
import ListFileSnsEventAssistantListWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantListWrapper/ListFileSnsEventAssistantListWrapper.client';

const SnsEventAssistantDefaultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<SearchParamsType>;
}) => {
  const { workspaceId } = await params;
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
            <TextCtaWrapper workspaceId={workspaceId} fileType={FileType.SNS_EVENT_ASSISTANT} />
            {/* 리스트 부분 */}
            {getListTitle(FileType.SNS_EVENT_ASSISTANT)}
            <ListFileSnsEventAssistantListWrapper />
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
