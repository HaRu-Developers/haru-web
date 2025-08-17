'use client';

import { useCallback } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { TEAM_MOOD_TRACKER_PAGE_ROUTES } from '@api/team-mood-tracker/end-point.constants';
import { useViewReportResponse } from '@api/team-mood-tracker/get/queries/useViewReportResponse';
import { useViewSurveyResponse } from '@api/team-mood-tracker/get/queries/useViewSurveyResponse';
import { useModifyMoodTrackerTitleMutation } from '@api/team-mood-tracker/post/mutations/useModifyTitleMutation';

import { GnbSection } from '@common/types/gnbs.types';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';
import { TeamMoodTrackerToastType } from '@features/team-mood-tracker/types/TeamMoodTrackerToastStore.types';

import { filterSafeResponseList } from '@features/team-mood-tracker/utils/safe-response-list.utils';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';
import { useTeamMoodToastActions } from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import TeamMoodAnswerChartSection from '@features/team-mood-tracker/components/mood-reports/answer-section/TeamMoodAnswerChartSection/TeamMoodAnswerChartSection.client';
import TeamMoodReportContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportContentSection/TeamMoodReportContentSection.client';
import TeamMoodReportNoneContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportNoneContentSection/TeamMoodReportNoneContentSection.server';
import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';
import TeamMoodReportTab from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/tabs/TeamMoodReportTab/TeamMoodReportTab.types';
import TeamMoodToast from '@features/team-mood-tracker/components/toasts/TeamMoodToast/TeamMoodToast.client';

const TeamMoodTrackerDetailPage = () => {
  const searchParams = useSearchParams();

  const params = useParams<{
    workspaceId: string;
    moodTrackerHashedId: string;
  }>();
  const workspaceId = params.workspaceId;
  const moodTrackerHashedId = params.moodTrackerHashedId;

  const router = useRouter();

  const { showCopyToast } = useTeamMoodToastActions();

  const { editing, commitTick, cancelTick } = useEditInfo();
  const { setEditing } = useEditActions();

  const currentTab =
    (searchParams.get('moodTab') as TeamMoodReportTabType) ??
    TeamMoodReportTabType.TEAM_MOOD_REPORT;

  const { data: surveyResponse, isFetching: isSurveyFetching } =
    useViewSurveyResponse(moodTrackerHashedId);
  const { data: reportResponse, isFetching: isReportFetching } =
    useViewReportResponse(moodTrackerHashedId);

  const { mutate: modifyTitle, isPending } = useModifyMoodTrackerTitleMutation();

  const isRefetching = isSurveyFetching || isReportFetching;

  const optimisticData = surveyResponse || reportResponse;
  const safeResponseList = filterSafeResponseList(surveyResponse?.responseList);

  const inputFileTitleMode = editing[EditorType.TITLE]
    ? InputFileTitleMode.EDITABLE
    : InputFileTitleMode.DEFAULT;

  const handleCopyClick = async () => {
    const reportContent = reportResponse?.report;

    if (!reportContent || reportContent.trim() === '') {
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
      return;
    }

    try {
      await navigator.clipboard.writeText(reportContent);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_SUCCESS });
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      showCopyToast({ type: TeamMoodTrackerToastType.COPY_EMPTY });
    }
  };

  const handleDownloadClick = () => {
    router.push(TEAM_MOOD_TRACKER_PAGE_ROUTES.DOWNLOAD(workspaceId, moodTrackerHashedId));
  };

  const handleTitleSave = useCallback(
    (newTitle: string) => {
      if (isPending) return;
      if (!newTitle.trim() || !optimisticData || newTitle === optimisticData.title) {
        setEditing(EditorType.TITLE, false);
        return;
      }
      setEditing(EditorType.TITLE, false);
      modifyTitle({
        moodTrackerHashedId,
        title: newTitle.trim(),
      });
    },
    [isPending, optimisticData, setEditing, modifyTitle, moodTrackerHashedId],
  );

  const handleTitleCancel = useCallback(() => {
    setEditing(EditorType.TITLE, false);
  }, [setEditing]);

  const handleTitleClick = useCallback(() => {
    setEditing(EditorType.TITLE, true);
  }, [setEditing]);

  if (isRefetching) {
    return <TeamMoodTrackerPageSkeleton />;
  }

  if (
    (currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && !surveyResponse) ||
    (currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && !reportResponse)
    // || (currentTab === TeamMoodReportTabType.SURVEY_LIST && !surveyData)
  ) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  if (!optimisticData) return null;

  return (
    <>
      <div className="relative flex flex-col">
        {/*상단 GNB*/}
        <GnbTop section={GnbSection.CUSTOM} title={optimisticData.title} />
        {/*토스트 영역 */}
        <div className="top-100pxr absolute right-0 left-0 z-100 flex justify-center">
          <TeamMoodToast />
        </div>
        {/*MAIN CONTENT*/}
        <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
          <div className="mb-14pxr">
            {/* 잘못된 조건부 렌더링을 제거하고, props가 올바르게 연결된 단일 컴포넌트로 수정 */}
            <InputFileTitle
              value={optimisticData.title}
              isLoading={isPending}
              mode={inputFileTitleMode}
              onSave={handleTitleSave}
              onCancel={handleTitleCancel}
              onClick={handleTitleClick}
              commitTick={commitTick}
              cancelTick={cancelTick}
            />
          </div>
          <div className="text-cap2-md">
            <FileCreatedInfo
              name={optimisticData.creatorName}
              userId={optimisticData.creatorId}
              dateTime={optimisticData.updatedAt}
            />
          </div>
        </div>
        <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
          <div className="w-668pxr mx-auto">
            <TeamMoodReportTab
              current={currentTab}
              counts={{
                [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
                [TeamMoodReportTabType.ANSWER_SUMMARY]: optimisticData.respondentsNum,
                [TeamMoodReportTabType.SURVEY_LIST]: 0,
              }}
              handleCopyClick={handleCopyClick}
              handleDownloadClick={handleDownloadClick}
            />
          </div>
        </div>

        {currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT &&
          (reportResponse?.report && reportResponse?.report.trim() !== '' ? (
            <TeamMoodReportContentSection
              suggestionList={reportResponse.suggestionList}
              report={reportResponse.report}
            />
          ) : (
            <TeamMoodReportNoneContentSection />
          ))}

        {currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && surveyResponse && (
          <TeamMoodAnswerChartSection responses={safeResponseList} />
        )}

        {currentTab === TeamMoodReportTabType.SURVEY_LIST && (
          <div className="w-668pxr mx-auto">
            <div className="text-t1-md mt-230pxr flex items-center justify-center text-center">
              경운님, 이쪽에 구현해주시면 됩니다.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamMoodTrackerDetailPage;
