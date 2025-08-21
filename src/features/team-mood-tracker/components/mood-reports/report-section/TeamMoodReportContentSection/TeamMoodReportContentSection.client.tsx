'use client';

import { useRouter } from 'next/navigation';

import { TEAM_MOOD_TRACKER_PAGE_ROUTES } from '@api/team-mood-tracker/end-point.constants';
import { useViewReportResponse } from '@api/team-mood-tracker/get/queries/useViewReportResponse';

import { FileType } from '@common/types/file-type.enum';

import SurveyInSite from '@common/components/box-text/SurveyInSite/SurveyInSite.server';
import MarkdownContent from '@common/components/mark-down-content/MarkdownContent.server';

import { TeamMoodTrackerToastType } from '@features/team-mood-tracker/types/TeamMoodTrackerToastStore.types';

import { useTeamMoodToastActions } from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import TeamMoodReportNoneContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportNoneContentSection/TeamMoodReportNoneContentSection.server';

import TeamMoodReportTab from '../TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '../TeamMoodReportTab/TeamMoodReportTab.types';
import { TeamMoodReportContentSectionProps } from './TeamMoodReportContentSection.types';

const TeamMoodReportContentSection = ({
  moodTrackerHashedId,
  workspaceId,
  respondentsNum,
}: TeamMoodReportContentSectionProps) => {
  const router = useRouter();
  const { data: reportResponse, isFetching: isReportFetching } =
    useViewReportResponse(moodTrackerHashedId);

  const { report, suggestionList } = reportResponse || {};

  const { showCopyToast } = useTeamMoodToastActions();

  const handleCopyClick = async () => {
    if (!report || report.trim() === '') {
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
      return;
    }
    try {
      await navigator.clipboard.writeText(report);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_SUCCESS });
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
    }
  };

  const handleDownloadClick = () => {
    router.push(TEAM_MOOD_TRACKER_PAGE_ROUTES.DOWNLOAD(workspaceId, moodTrackerHashedId));
  };

  return (
    <>
      {/* 로딩 중이거나 데이터가 없어도 탭 UI는 일관되게 보여줍니다. */}
      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTab
            current={TeamMoodReportTabType.TEAM_MOOD_REPORT}
            counts={{
              [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
              [TeamMoodReportTabType.ANSWER_SUMMARY]: respondentsNum,
              [TeamMoodReportTabType.SURVEY_LIST]: 0,
            }}
            handleCopyClick={handleCopyClick}
            handleDownloadClick={handleDownloadClick}
          />
        </div>
      </div>

      {/* 컨텐츠 영역만 로딩/데이터 없음/데이터 있음을 기준으로 조건부 렌더링합니다. */}
      {!suggestionList || !report || report.trim() === '' ? (
        <TeamMoodReportNoneContentSection />
      ) : (
        <div className="mx-auto">
          <div className="mb-2pxr">
            <SurveyInSite title="HaRu의 제안" items={suggestionList} />
          </div>
          <div className="w-668pxr">
            <MarkdownContent variant={FileType.TEAM_MOOD_TRACKER} content={report} />
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMoodReportContentSection;
