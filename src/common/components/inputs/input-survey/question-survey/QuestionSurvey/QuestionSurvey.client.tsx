'use client';

import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';
import AddQuestion from '../AddQuestion/AddQuestion.client';
import QuestionOptions from '../QuestionOptions/QuestionOptions.client';
import SubjectQuestion from '../SubjectQuestion/SubjectQuestion.client';
import { QuestionSurveyProps } from './QuestionSurvey.types';

const QuestionSurvey = ({
  questionType,
  optionList,
  // isQuestionHaveEtcChoice,
  surveyComponentUsingSituation,
  subjectiveQuestionResponse,
  onOptionListChange,
  // onEtcChange,
  onSubjectiveQuestionResponseChange,
  onQuestionOptionCheck,
}: QuestionSurveyProps) => {
  /**
   * 질문에 새로운 옵션을 추가합니다.
   */
  const insertOption = (newOption: string) => {
    // const withoutEtc = optionList.filter((opt) => opt !== '기타...');
    // const hasEtc = optionList.includes('기타...');
    // const updated = [...withoutEtc, newOption];

    // 위 코드는 기타 옵션이 있는 경우를 상정하고 만들어졌으나
    // 현재는 기타 옵션이 BE측에서 미구현으로, 단순히 새로운 옵션을 추가합니다.
    onOptionListChange?.([...optionList, newOption]);
  };

  /**
   * 옵션 추가 버튼에 대한 핸들링을 합니다.
   *
   * 빈 문자열을 추가하여, placeholder가 표출되도록 합니다.
   */
  const handleAddOptionClick = () => {
    insertOption('');
  };

  // 기타 옵션 추가에 대한 핸들러입니다.
  // BE측 미구현에 따라 주석 처리 합니다.

  // const handleAddEtcOptionClick = () => {
  //   const withoutEtc = optionList.filter((opt) => opt !== '기타...');
  //   onOptionListChange?.([...withoutEtc, '기타...']);
  //   onEtcChange?.(true);
  // };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...optionList];
    updatedOptions[index] = value;
    onOptionListChange?.(updatedOptions);
  };

  /**
   * 질문 내 옵션에 대한 클릭을 처리합니다.
   */
  const handleOptionCheck = (indexList: number[]) => {
    onQuestionOptionCheck?.(indexList);
  };

  // 주관식 질문일 경우에 대한 return 입니다.
  // 제목만 수정 가능합니다.
  if (questionType === InputSurveyQuestionType.SUBJECT) {
    return (
      <div className="w-full">
        <SubjectQuestion
          subjectiveQuestionResponse={subjectiveQuestionResponse}
          surveyComponentUsingSituation={
            surveyComponentUsingSituation ?? SurveySituation.PARTICIPATING_SURVEY
          }
          onSubjectiveQuestionResponseChange={onSubjectiveQuestionResponseChange}
        />
      </div>
    );
  }

  // 기타 경우 (체크박스, 주관식) 에 대한 컴포넌트 입니다.
  return (
    <div className="w-full">
      <QuestionOptions
        optionList={optionList}
        surveyComponentUsingSituation={surveyComponentUsingSituation}
        onOptionListChange={handleOptionChange}
        onQuestionOptionCheck={handleOptionCheck}
        questionType={questionType}
      />
      {/*설문을 생성하는 상황에서는 항목을 추가할 수 있는 컴포넌트를 추가로 렌더링 해줍니다.*/}
      {surveyComponentUsingSituation === SurveySituation.CREATING_SURVEY && (
        <AddQuestion
          type={questionType}
          // isQuestionHaveEtcChoice={isQuestionHaveEtcChoice}
          onOptionAddClick={handleAddOptionClick}
          // onEtcAddClick={handleAddEtcOptionClick}
        />
      )}
    </div>
  );
};

export default QuestionSurvey;
