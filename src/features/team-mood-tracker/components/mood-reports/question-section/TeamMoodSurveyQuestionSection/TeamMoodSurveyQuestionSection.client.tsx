'use client';

import { useEffect, useState } from 'react';

import { useViewSurveyQuestion } from '@api/team-mood-tracker/get/queries/useViewSurveyQuestion';

import SurveyInfo from '@common/components/box-text/SurveyInfo/SurveyInfo.server';
import InputSurveyQuestion from '@common/components/inputs/input-survey/InputSurveyQuestion/InputSurveyQuestion.client';
import { SurveySituation } from '@common/components/inputs/input-survey/types/input-survey.common.types';

import {
  useSetQuestionsFromApiFormat,
  useSetSurveyComponentUsingSituation,
  useSurveyQuestion,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import TeamMoodTrackerFilePageSectionSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerFilePageSectionSkeleton/TeamMoodTrackerFilePageSectionSkeleton.server';

import TeamMoodReportTab from '../../report-section/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '../../report-section/TeamMoodReportTab/TeamMoodReportTab.types';
import { TeamMoodSurveyQuestionSectionProps } from './TeamMoodSurveyQuestionSection.types';

const TeamMoodSurveyQuestionSection = ({
  moodTrackerHashedId,
  respondentsNum,
}: TeamMoodSurveyQuestionSectionProps) => {
  const { data, isLoading } = useViewSurveyQuestion(moodTrackerHashedId);
  const setQuestionsFromApi = useSetQuestionsFromApiFormat();
  const questions = useSurveyQuestion();

  const setSituation = useSetSurveyComponentUsingSituation();

  useEffect(() => {
    setSituation(SurveySituation.PARTICIPATING_SURVEY);
  }, [setSituation]);

  const [isApiDataApplied, setIsApiDataApplied] = useState<boolean>(false);

  useEffect(() => {
    if (!isApiDataApplied && !isLoading && data) {
      // API로부터 받은 질문 데이터를 상태에 저장합니다.
      setQuestionsFromApi(data);
      // 상태가 업데이트되었음을 표시합니다.
      setIsApiDataApplied(true);
    }
  }, [data, isApiDataApplied, isLoading, setQuestionsFromApi]);

  return (
    <>
      {/* 탭 컴포넌트를 항상 렌더링합니다. */}
      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTab
            current={TeamMoodReportTabType.SURVEY_LIST}
            counts={{
              [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
              [TeamMoodReportTabType.ANSWER_SUMMARY]: respondentsNum,
              [TeamMoodReportTabType.SURVEY_LIST]: 0,
            }}
            // handleLinkClick={handleLinkClick} -> 구현 되어 있지 않음
          />
        </div>
      </div>

      {/* 컨텐츠 영역만 로딩/데이터 없음/데이터 있음을 기준으로 조건부 렌더링합니다. */}
      {isLoading || !data || !isApiDataApplied ? (
        <TeamMoodTrackerFilePageSectionSkeleton />
      ) : (
        <div className="w-668pxr mx-auto">
          <SurveyInfo title={data.title} content={data.description} />
          <div className="gap-y-14pxr mt-15pxr flex flex-col">
            {/* TODO: type 통일 필요 .. assertion은 사용되서는 안됩니다 ㅠㅠ */}
            {questions.map((question) => (
              <InputSurveyQuestion key={question.id} questionId={question.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMoodSurveyQuestionSection;
