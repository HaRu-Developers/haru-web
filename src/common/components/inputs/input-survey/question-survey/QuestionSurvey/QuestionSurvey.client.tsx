'use client';

import { InputSurveyQuestionType, SurveyVisibility } from '../../types/input-survey.common.types';
import AddQuestion from '../AddQuestion/AddQuestion.client';
import QuestionOptions from '../QuestionOptions/QuestionOptions.client';
import SubjectQuestion from '../SubjectQuestion/SubjectQuestion.client';
import { QuestionSurveyProps } from './QuestionSurvey.types';

const QuestionSurvey = ({
  type,
  optionList,
  isEtc,
  visibility,
  description,
  onOptionChange,
  onEtcChange,
  onDescriptionChange,
  onCheck,
}: QuestionSurveyProps) => {
  const insertOption = (newOption: string) => {
    const withoutEtc = optionList.filter((opt) => opt !== '기타...');
    const hasEtc = optionList.includes('기타...');
    const updated = [...withoutEtc, newOption];
    onOptionChange?.(hasEtc ? [...updated, '기타...'] : updated);
  };

  const handleOptionClick = () => {
    insertOption('');
  };

  const handleEtcClick = () => {
    const withoutEtc = optionList.filter((opt) => opt !== '기타...');
    onOptionChange?.([...withoutEtc, '기타...']);
    onEtcChange?.(true);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...optionList];
    updatedOptions[index] = value;
    onOptionChange?.(updatedOptions);
  };

  const handleCheck = (value: string[]) => {
    onCheck?.(value);
  };
  if (type === InputSurveyQuestionType.SUBJECT) {
    return (
      <div className="w-full">
        <SubjectQuestion
          description={description}
          visibility={visibility ?? SurveyVisibility.PUBLIC}
          onChange={onDescriptionChange}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <QuestionOptions
        optionList={optionList}
        visibility={visibility}
        onChange={handleOptionChange}
        onCheck={handleCheck}
        type={type}
      />
      {visibility === SurveyVisibility.PRIVATE && (
        <AddQuestion
          type={type}
          isEtc={isEtc}
          onOptionAddClick={handleOptionClick}
          onEtcAddClick={handleEtcClick}
        />
      )}
    </div>
  );
};

export default QuestionSurvey;
