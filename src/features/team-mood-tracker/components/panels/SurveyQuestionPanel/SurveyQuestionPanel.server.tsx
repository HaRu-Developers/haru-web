import { SurveyQuestionTabLabels } from '@features/team-mood-tracker/components/create-survey-page/SurveyQuestionTab/SurveyQuestionTab.constants';
import { SurveyQuestionTabType } from '@features/team-mood-tracker/components/create-survey-page/SurveyQuestionTab/SurveyQuestionTab.types';

import { SurveyQuestionPanelProps } from './SurveyQuestionPanel.types';

const SurveyQuestionPanel = ({ survey }: SurveyQuestionPanelProps) => {
  const { isSubmitted } = survey;
  const currentTab = isSubmitted
    ? SurveyQuestionTabType.SURVEY_LIST
    : SurveyQuestionTabType.SURVEY_GENERATE;
  return (
    <div className="flex flex-col items-start gap-4">
      <p>{SurveyQuestionTabLabels[currentTab as SurveyQuestionTabType]} 내용</p>
    </div>
  );
};

export default SurveyQuestionPanel;
