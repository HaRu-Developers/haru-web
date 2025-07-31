import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileAiMeetingManagerWrapper from '@features/ai-meeting-manager/components/ListFileAiMeetingManagerWrapper/ListFileAiMeetingManagerWrapper.types';

const AiMeetingAssistantDefaultPage = () => {
  return (
    <section>
      <GnbTop section={GnbSection.AI_MEETING_MANAGER} />
      <div className="assistant-wrapper">
        {/* cta 부분 */}
        {getCtaDescription(FileType.AI_MEETING_MANAGER)}
        <TextCtaWrapper fileType={FileType.AI_MEETING_MANAGER} />
        {/* 리스트 부분 */}
        {getListTitle(FileType.AI_MEETING_MANAGER)}
        <ListHeader fileType={FileType.AI_MEETING_MANAGER} />
        <ListFileAiMeetingManagerWrapper />
      </div>
    </section>
  );
};

export default AiMeetingAssistantDefaultPage;
