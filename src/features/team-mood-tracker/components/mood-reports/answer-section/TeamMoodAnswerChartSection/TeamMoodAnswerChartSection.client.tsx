'use client';

import BarChart from '@common/components/survey/BarChart/BarChar.client';
import PieChart from '@common/components/survey/PieChart/PieChart.client';
import SubjectiveAnswers from '@common/components/survey/SubjectiveAnswer/SubjectiveAnswser.server';

import { SurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

import { TeamMoodAnswerChartSectionProps } from './TeamMoodAnswerChartSection.types';

const PIE_CHART_COLORS = ['#E65787', '#5E8BFF', '#FFD66C', '#84D1B6', '#B28DFF']; // 임시 색상

const TeamMoodAnswerChartSection = ({ responses }: TeamMoodAnswerChartSectionProps) => {
  return (
    <div className="w-668pxr gap-y-24pxr mx-auto flex flex-col">
      {responses.map((response) => {
        // 4. case의 문자열을 enum으로 변경하여 안정성을 높입니다.
        switch (response.type) {
          case SurveyQuestionType.MULTIPLE_CHOICE: {
            const chartData = {
              labels: response.mulipleChoiceResponseList.map((item) => item.content),
              values: response.mulipleChoiceResponseList.map((item) => item.selectedNum),
              colors: PIE_CHART_COLORS.slice(0, response.mulipleChoiceResponseList.length),
            };
            return (
              <PieChart key={response.questionId} title={response.questionTitle} data={chartData} />
            );
          }

          case SurveyQuestionType.CHECKBOX_CHOICE: {
            const chartData = {
              labels: response.checkboxChoiceResponseList.map((item) => item.content),
              values: response.checkboxChoiceResponseList.map((item) => item.selectedNum),
            };

            return (
              <BarChart key={response.questionId} title={response.questionTitle} data={chartData} />
            );
          }

          case SurveyQuestionType.SUBJECTIVE:
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
  );
};

export default TeamMoodAnswerChartSection;
