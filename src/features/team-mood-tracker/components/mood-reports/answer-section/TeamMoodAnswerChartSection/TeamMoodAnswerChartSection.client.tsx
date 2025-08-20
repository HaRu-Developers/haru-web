'use client';

import { useViewSurveyResponse } from '@api/team-mood-tracker/get/queries/useViewSurveyResponse';

import BarChart from '@common/components/survey/BarChart/BarChar.client';
import PieChart from '@common/components/survey/PieChart/PieChart.client';
import SubjectiveAnswers from '@common/components/survey/SubjectiveAnswer/SubjectiveAnswser.server';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

import { filterSafeResponseList } from '@features/team-mood-tracker/utils/safe-response-list.utils';

import TeamMoodReportTab from '../../report-section/TeamMoodReportTab/TeamMoodReportTab.client';
import { TeamMoodReportTabType } from '../../report-section/TeamMoodReportTab/TeamMoodReportTab.types';
import TeamMoodAnswerNoneContentSection from '../TeamMoodAnswerNoneContentSection/TeamMoodAnswerNoneContentSection.server';
import { TeamMoodAnswerChartSectionProps } from './TeamMoodAnswerChartSection.types';

const PIE_CHART_COLORS = ['#E65787', '#5E8BFF', '#FFD66C', '#84D1B6', '#B28DFF']; // 임시 색상

const TeamMoodAnswerChartSection = ({
  moodTrackerHashedId,
  respondentsNum,
}: TeamMoodAnswerChartSectionProps) => {
  const { data: surveyResponse, isFetching: isSurveyFetching } =
    useViewSurveyResponse(moodTrackerHashedId);

  const responses = filterSafeResponseList(surveyResponse?.responseList);

  return (
    <>
      {/* 탭 컴포넌트를 항상 렌더링합니다. */}
      <div className="border-stroke-200 mb-14pxr w-full border-b border-solid bg-white">
        <div className="w-668pxr mx-auto">
          <TeamMoodReportTab
            current={TeamMoodReportTabType.ANSWER_SUMMARY}
            counts={{
              [TeamMoodReportTabType.TEAM_MOOD_REPORT]: 0,
              [TeamMoodReportTabType.ANSWER_SUMMARY]: respondentsNum,
              [TeamMoodReportTabType.SURVEY_LIST]: 0,
            }}
          />
        </div>
      </div>

      {/* 2. 컨텐츠 영역만 로딩/데이터 없음/데이터 있음을 기준으로 조건부 렌더링합니다. */}
      {!responses || responses.length === 0 ? (
        <TeamMoodAnswerNoneContentSection />
      ) : (
        <div className="w-668pxr gap-y-24pxr mx-auto flex flex-col">
          {responses.map((response) => {
            switch (response.type) {
              case TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE: {
                const chartData = {
                  labels: response.multipleChoiceResponseList.map((item) => item.content),
                  values: response.multipleChoiceResponseList.map((item) => item.selectedNum),
                  colors: PIE_CHART_COLORS.slice(0, response.multipleChoiceResponseList.length),
                };
                return (
                  <PieChart
                    key={response.questionId}
                    title={response.questionTitle}
                    data={chartData}
                  />
                );
              }
              case TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE: {
                const chartData = {
                  labels: response.checkboxChoiceResponseList.map((item) => item.content),
                  values: response.checkboxChoiceResponseList.map((item) => item.selectedNum),
                };
                return (
                  <BarChart
                    key={response.questionId}
                    title={response.questionTitle}
                    data={chartData}
                  />
                );
              }
              case TeamMoodTrackerSurveyQuestionType.SUBJECTIVE:
                return (
                  <SubjectiveAnswers
                    key={response.questionId}
                    title={response.questionTitle}
                    answers={response.subjectiveResponseList}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </>
  );
};

export default TeamMoodAnswerChartSection;
