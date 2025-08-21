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

const CHART_COLOR_PALETTE = [
  '#E65787',
  '#E6578766', // 40%
  '#E6578733', // 20%
  '#27998DB3', // 70%
  '#6664E3B3', // 70%
  '#89A4BBB3', // 70%
  '#007AFF66', // 40%
  '#27998D66', // 40%
  '#6664E366', // 40%
  '#89A4BB66', // 40%
  '#E6578766', // 40%
  '#E6578733', // 20%
  '#27998DB3', // 70%
  '#6664E3B3', // 70%
  '#89A4BBB3', // 70%
  '#007AFF66', // 40%
  '#27998D66', // 40%
  '#6664E366', // 40%
  '#89A4BB66', // 40%
];

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
        <div className="w-668pxr gap-y-24pxr mb-50pxr mx-auto flex flex-col">
          {responses.map((response) => {
            switch (response.type) {
              case TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE: {
                const filteredChartItems = response.multipleChoiceResponseList.filter(
                  (item) => item.selectedNum > 0,
                );

                const chartData = {
                  // 범례(legend)에는 모든 라벨을 그대로 보여줍니다.
                  legendLabels: response.multipleChoiceResponseList.map((item) => item.content),
                  legendColors: response.multipleChoiceResponseList.map(
                    (_, index) => CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length],
                  ),

                  // 차트에 그릴 데이터는 필터링된 값을 사용합니다.
                  chartLabels: filteredChartItems.map((item) => item.content),
                  chartValues: filteredChartItems.map((item) => item.selectedNum),
                  chartColors: filteredChartItems.map(
                    (_, index) => CHART_COLOR_PALETTE[index % CHART_COLOR_PALETTE.length],
                  ),
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
