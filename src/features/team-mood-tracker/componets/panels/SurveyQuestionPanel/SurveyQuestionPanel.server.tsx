import {
  SurveyQuestionTabLabels,
  SurveyQuestionTabType,
} from '@features/team-mood-tracker/constants/tabs';

import { SurveyQuestionPanelProps } from './SurveyQuestionPanel.types';

const SurveyQuestionPanel = ({ survey }: SurveyQuestionPanelProps) => {
  const { isSubmitted } = survey;
  const currentTab = survey.isSubmitted
    ? SurveyQuestionTabType.QUESTION_LIST
    : SurveyQuestionTabType.QUESTION_GENERATE;
  return (
    <div className="flex flex-col items-start gap-4">
      <p>{SurveyQuestionTabLabels[currentTab as SurveyQuestionTabType]} 내용</p>
    </div>
  );
};

export default SurveyQuestionPanel;
