import { FileType } from '@common/types/file-type.enum';
import { GnbSection } from '@common/types/gnbs.types';

import { getCtaDescription, getListTitle } from '@common/utils/assistant-mapping.utils';

import TextCtaWrapper from '@common/components/cta/TextCtaWrapper/TextCtaWrapper.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

import ListFileTeamMoodTrakerWrapper from '@features/team-mood-tracker/components/ListFileTeamMoodTrackerWrapper/ListFileTeamMoodTrackerWrapper.client';

interface TeamMoodTrackerDefaultPageProps {
  params?: Promise<{ workspaceId: string }>;
}

const TeamMoodTrackerDefaultPage = async ({ params }: TeamMoodTrackerDefaultPageProps) => {
  const workspaceId = (await params)?.workspaceId ?? '';

  return (
    <section>
      <GnbTop section={GnbSection.TEAM_MOOD_TRACKER} />
      <div className="assistant-wrapper">
        {/* cta 부분 */}
        {getCtaDescription(FileType.TEAM_MOOD_TRACKER)}
        {/* TODO: 병합 중 임시 해결 */}
        <TextCtaWrapper fileType={FileType.TEAM_MOOD_TRACKER} workspaceId={workspaceId} />
        {/* 리스트 부분 */}
        {getListTitle(FileType.TEAM_MOOD_TRACKER)}
        <ListHeader fileType={FileType.TEAM_MOOD_TRACKER} />
        <ListFileTeamMoodTrakerWrapper />
      </div>
    </section>
  );
};

export default TeamMoodTrackerDefaultPage;
