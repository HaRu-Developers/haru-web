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

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';
import { useTeamMoodToastActions } from '@features/team-mood-tracker/hooks/stores/useTeamMoodTrackerToastStore';

import TeamMoodAnswerChartSection from '@features/team-mood-tracker/components/mood-reports/answer-section/TeamMoodAnswerChartSection/TeamMoodAnswerChartSection.client';
import TeamMoodSurveyQuestionSection from '@features/team-mood-tracker/components/mood-reports/question-section/TeamMoodSurveyQuestionSection/TeamMoodSurveyQuestionSection.client';
import TeamMoodReportContentSection from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportContentSection/TeamMoodReportContentSection.client';
import TeamMoodReportTab from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '@features/team-mood-tracker/components/mood-reports/report-section/TeamMoodReportTab/TeamMoodReportTab.types';
import TeamMoodTrackerPageSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerSkeleton/TeamMoodTrackerSkeleton';
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

  /**
   * query string에서 현재 tab 정보를 가져옵니다.
   */
  const currentTab =
    (searchParams.get('moodTab') as TeamMoodReportTabType) ??
    TeamMoodReportTabType.TEAM_MOOD_REPORT;

  // TODO: 이거 다 삭제해야 합니다.
  const { data: surveyResponse, isFetching: isSurveyFetching } =
    useViewSurveyResponse(moodTrackerHashedId);
  const { data: reportResponse, isFetching: isReportFetching } =
    useViewReportResponse(moodTrackerHashedId);

  // console.log('LOG', surveyResponse, reportResponse);
  /**
   * 파일 제목을 변경하는 useMutation
   */
  const { mutate: modifyTitle, isPending } = useModifyMoodTrackerTitleMutation();

  const isRefetching = isSurveyFetching || isReportFetching;

  // TODO: 아래 수정 후에 const로 다시 변경
  const optimisticData = surveyResponse || reportResponse;

  // TODO: 설문 정보 조회 API가 새로 만들어지면 다시 추가할 필요가 있습니다
  // if (!optimisticData) return <div>NO OPTIMISTIC DATA, CHECK CODE</div>;
  const dummyData = {
    title: 'NO_DATA',
    creatorName: 'NO_DATA',
    creatorId: 'NO_DATA',
    updatedAt: new Date().toISOString(),
    respondentsNum: 404,
  };

  const { title, creatorName, creatorId, updatedAt, respondentsNum } = optimisticData || dummyData;

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

  // TODO: skeleton은 tab 단위로 수정
  if (isRefetching) {
    return <TeamMoodTrackerPageSkeleton />;
  }

  // TODO: error handlers - is it needed?
  // if (
  //   (currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && !surveyResponse) ||
  //   (currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && !reportResponse)
  //   // || (currentTab === TeamMoodReportTabType.SURVEY_LIST && !surveyData)
  // ) {
  //   return <div>데이터를 불러올 수 없습니다.</div>;
  // }

  return (
    <>
      <div className="relative flex flex-col">
        {/*상단 GNB*/}
        <GnbTop section={GnbSection.CUSTOM} title={title} />
        {/*토스트 영역 */}
        <div className="top-100pxr absolute right-0 left-0 z-100 flex justify-center">
          <TeamMoodToast />
        </div>
        {/*MAIN CONTENT*/}
        <div className="mt-24pxr mb-10pxr w-668pxr mx-auto flex-col">
          <div className="mb-14pxr">
            {/* 잘못된 조건부 렌더링을 제거하고, props가 올바르게 연결된 단일 컴포넌트로 수정 */}
            <InputFileTitle
              value={title}
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
            <FileCreatedInfo name={creatorName} userId={creatorId} dateTime={updatedAt} />
          </div>
        </div>
        {/* 탭 영역 */}
        {/* TODO: 이거 그냥 마음에 안들어서 바꾸고 싶어요 @kyeoungwoon */}
        <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
          <div className="w-668pxr mx-auto">
            <TeamMoodReportTab
              current={currentTab}
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
        {currentTab === TeamMoodReportTabType.TEAM_MOOD_REPORT && (
          <TeamMoodReportContentSection moodTrackerHashedId={moodTrackerHashedId} />
        )}
        {currentTab === TeamMoodReportTabType.ANSWER_SUMMARY && surveyResponse && (
          <TeamMoodAnswerChartSection moodTrackerHashedId={moodTrackerHashedId} />
        )}
        {currentTab === TeamMoodReportTabType.SURVEY_LIST && (
          // 경운님, 이쪽에 구현해주시면 됩니다.
          // 저쪽 신사분의 메세지는 냅둬야지~
          <TeamMoodSurveyQuestionSection moodTrackerHashedId={moodTrackerHashedId} />
        )}
      </div>
    </>
  );
};

export default TeamMoodTrackerDetailPage;
