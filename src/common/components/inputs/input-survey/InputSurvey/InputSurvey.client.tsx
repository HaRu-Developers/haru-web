'use client';

import ButtonsSurvey from '@common/components/inputs/input-survey/ButtonsSurvey/ButtonsSurvey.client';
import InputSurveyQuestionTitle from '@common/components/inputs/input-survey/InputTitleSurvey/InputTitleSurvey.client';
import MovingBarSurvey from '@common/components/inputs/input-survey/MovingBarSurvey/MovingBarSurvey.client';
import SelectBoxOption from '@common/components/select-box/SelectBoxOption/SelectBoxOption.client';

import QuestionSurvey from '../question-survey/QuestionSurvey/QuestionSurvey.client';
import { InputSurveyQuestionType, SurveySituation } from '../types/input-survey.common.types';
import { InputSurveyQuestionProps } from './InputSurvey.types';

const InputSurveyQuestion = ({
  questionTitle,
  questionTitlePlaceholder,
  questionType,
  multipleOrCheckboxOptions = [''],
  subjectiveQuestionDescription,
  surveyComponentUsingSituation,
  isQuestionMandatory, // 추후에 border 색이나 내부적으로 사용할 수도 있을 것 같아 추가
  // isQuestionHaveEtcChoice = false,
  handlers,
}: InputSurveyQuestionProps) => {
  const selectBoxOptions = [
    { state: InputSurveyQuestionType.CHOICE, label: '객관식 질문' },
    { state: InputSurveyQuestionType.CHECKBOX, label: '체크박스' },
    { state: InputSurveyQuestionType.SUBJECT, label: '주관식 질문' },
  ];

  const {
    onTopMovingBarClick,
    onQuestionTitleChange,
    onQuestionTypeChange,
    onIsMandatoryToggle,
    onQuestionDelete,
    onOptionListChange,
    onSubjectiveQuestionResponseChange,
    // onEtcChange,
    onQuestionOptionCheck,
  } = handlers || {};

  /**
   * 설문조사 질문 타입 변경 핸들러
   */
  const handleSelectBoxClick = (value: string) => {
    const selectValue = value as InputSurveyQuestionType;
    onQuestionTypeChange?.(selectValue);
  };

  return (
    <div className="w-668pxr px-17pxr py-20pxr gap-10pxr rounded-4pxr shadow-survey-form border-stroke-200 relative flex shrink-0 flex-col items-start border-2 bg-white">
      {/* 설문 생성 시에만 상단 바 표시 */}
      {surveyComponentUsingSituation === SurveySituation.CREATING_SURVEY && (
        <MovingBarSurvey className="absolute top-0 left-0" onClick={onTopMovingBarClick} />
      )}

      <div className="gap-20pxr flex w-full flex-col items-start">
        {/* 상단 부분 */}
        <div className="w-628pxr flex items-end justify-between">
          <InputSurveyQuestionTitle
            title={questionTitle}
            onChange={onQuestionTitleChange}
            placeholder={questionTitlePlaceholder}
            visibility={surveyComponentUsingSituation}
            // 설문지를 생성하는 상황이 아닐 때 제목 하단의 stroke가 길어지기 위해 사용
            className={
              surveyComponentUsingSituation !== SurveySituation.CREATING_SURVEY ? 'w-full' : ''
            }
          />

          {/* 질문 타입을 변경할 수 있는 드롭다운 입니다. */}
          {/* 설문 생성 시에만 변경할 수 있도록 조건부로 렌더링 합니다. */}
          {surveyComponentUsingSituation === SurveySituation.CREATING_SURVEY && (
            <SelectBoxOption
              options={selectBoxOptions}
              initState={questionType || selectBoxOptions[0].state}
              onClick={handleSelectBoxClick}
              className="w-100pxr"
            />
          )}
        </div>

        {/* 질문에 대한 옵션들이나 항목들이 있는 main part 입니다. */}
        <QuestionSurvey
          questionType={questionType}
          optionList={multipleOrCheckboxOptions}
          // isQuestionHaveEtcChoice={isQuestionHaveEtcChoice}
          surveyComponentUsingSituation={surveyComponentUsingSituation}
          subjectiveQuestionResponse={subjectiveQuestionDescription}
          onOptionListChange={onOptionListChange}
          // onEtcChange={onEtcChange}
          onSubjectiveQuestionResponseChange={onSubjectiveQuestionResponseChange}
          onQuestionOptionCheck={onQuestionOptionCheck}
        />
      </div>

      {/*질문 생성 시에만 필수 여부 및 삭제 버튼 등이 활성화될 수 있도록 조건부로 렌더링 합니다.*/}
      {surveyComponentUsingSituation === SurveySituation.CREATING_SURVEY && (
        <div className="flex w-full justify-end">
          <ButtonsSurvey
            isMandatory={isQuestionMandatory}
            onDelete={onQuestionDelete}
            onToggle={onIsMandatoryToggle}
          />
        </div>
      )}
    </div>
  );
};

export default InputSurveyQuestion;
