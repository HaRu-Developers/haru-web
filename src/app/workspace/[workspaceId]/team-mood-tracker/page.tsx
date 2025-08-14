import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileTeamMoodTrakerWrapper from '@features/team-mood-tracker/components/ListFileTeamMoodTrackerWrapper/ListFileTeamMoodTrackerWrapper.client';

const TeamMoodTrackerDefaultPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;

  return (
    <section>
      <GnbTop section={GnbSection.TEAM_MOOD_TRACKER} />
      <div className="assistant-wrapper">
        {/* cta 부분 */}
        {getCtaDescription(FileType.TEAM_MOOD_TRACKER)}
        <TextCtaWrapper workspaceId={workspaceId} fileType={FileType.TEAM_MOOD_TRACKER} />
        {/* 리스트 부분 */}
        {getListTitle(FileType.TEAM_MOOD_TRACKER)}
        <ListHeader fileType={FileType.TEAM_MOOD_TRACKER} />
        <ListFileTeamMoodTrakerWrapper />
      </div>
    </section>
  );
};

export default TeamMoodTrackerDefaultPage;
