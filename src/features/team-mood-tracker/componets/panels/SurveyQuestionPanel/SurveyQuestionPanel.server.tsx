import { SurveyQuestionTabLabels } from '../../tabs/SurveyQuestionTab/SurveyQuestionTab.constants';
import { SurveyQuestionTabType } from '../../tabs/SurveyQuestionTab/SurveyQuestionTab.types';
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
