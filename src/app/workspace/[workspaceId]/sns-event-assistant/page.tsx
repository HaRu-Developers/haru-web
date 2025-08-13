import { FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';
import { GnbSection, SnsGnbTabType } from '@common/types/gnbs.types';
import { SearchParamsType } from '@common/types/routes.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';
import parseEnum from '@common/utils/parse-enum.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileSnsEventAssistantLinkWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantLinkWrapper/ListFileSnsEventAssistantLinkWrapper.client';
import ListFileSnsEventAssistantWrapper from '@features/sns-event-assistant/components/list-file-wrapper/ListFileSnsEventAssistantWrapper/ListFileSnsEventAssistantWrapper.client';

const SnsEventAssistantDefaultPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<SearchParamsType>;
}) => {
  const { workspaceId } = await params;
  const { snsGnbTab } = await searchParams;
  const formattedSnsGnbTabTab = parseEnum(snsGnbTab, SnsGnbTabType, SnsGnbTabType.ALL_EVENTS);

  return (
    <section>
      <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={formattedSnsGnbTabTab} />
      <div className="assistant-wrapper">
        {formattedSnsGnbTabTab === SnsGnbTabType.ALL_EVENTS ? (
          <>
            {/* cta 부분 */}
            {getCtaDescription(FileType.SNS_EVENT_ASSISTANT)}
            <TextCtaWrapper fileType={FileType.SNS_EVENT_ASSISTANT} workspaceId={workspaceId} />
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
