'use client';

import clsx from 'clsx';

import ButtonsSurvey from '@common/components/inputs/input-survey/ButtonsSurvey/ButtonsSurvey.client';
import InputSurveyQuestionTitle from '@common/components/inputs/input-survey/InputTitleSurvey/InputTitleSurvey.client';
import MovingBarSurvey from '@common/components/inputs/input-survey/MovingBarSurvey/MovingBarSurvey.client';
import SelectBoxOption from '@common/components/select-box/SelectBoxOption/SelectBoxOption.client';

import {
  useGetSurveyQuestionById,
  useIsDuplicateOptionInQuestion,
  useIsQuestionResponseValidWhenParticipating,
  useIsQuestionTitleEmptyOrHaveEmptyOptions,
  useIsQuestionValid,
  useIsSurveyResponseValid,
  useSetSurveyQuestionType,
  useSurveySituation,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import QuestionSurvey from '../question-survey/QuestionSurvey/QuestionSurvey.client';
import { InputSurveyQuestionType, SurveySituation } from '../types/input-survey.common.types';
import { InputSurveyQuestionProps } from './InputSurveyQuestion.types';

const InputSurveyQuestion = ({ questionId }: InputSurveyQuestionProps) => {
  const selectBoxOptions = [
    { state: InputSurveyQuestionType.CHOICE, label: '객관식 질문' },
    { state: InputSurveyQuestionType.CHECKBOX, label: '체크박스' },
    { state: InputSurveyQuestionType.SUBJECT, label: '주관식 질문' },
  ];

  const handleQuestionTypeChange = useSetSurveyQuestionType();
  const situation = useSurveySituation();

  const checkIsQuestionValid = useIsQuestionValid();
  const isQuestionHasTitleAndValidOptions = useIsQuestionTitleEmptyOrHaveEmptyOptions();
  const isQuestionResponseValid = useIsQuestionResponseValidWhenParticipating();

  /**
   * 생성 시
   * 제목이 없는 경우 - 제목 또는 선택지는 필수로 작성해야 합니다.
   * 중복된 선택지가 있는 경우 - 중복된 선택지가 있습니다. 다른 항목을 입력해 주세요.
   *
   * 참여 시
   * 필수 답변이 아직 작성되지 않은 경우 - 필수 답변을 작성해 주세요.
   */
  let questionScopeMessage: string;

  if (situation === SurveySituation.CREATING_SURVEY) {
    if (!isQuestionHasTitleAndValidOptions(questionId)) {
      questionScopeMessage = '제목 또는 선택지는 필수로 작성해야 합니다.';
    } else if (!checkIsQuestionValid(questionId)) {
      questionScopeMessage = '중복된 선택지가 있습니다. 다른 항목을 입력해 주세요.';
    } else {
      questionScopeMessage = '';
    }
  } else if (situation === SurveySituation.PARTICIPATING_SURVEY) {
    if (!isQuestionResponseValid(questionId)) {
      questionScopeMessage = '필수 답변을 작성해 주세요.';
    } else {
      questionScopeMessage = '';
    }
  } else {
    questionScopeMessage = '';
  }

  const isQuestionStatusValid =
    situation === SurveySituation.CREATING_SURVEY
      ? checkIsQuestionValid(questionId)
      : situation === SurveySituation.PARTICIPATING_SURVEY
        ? isQuestionResponseValid(questionId)
        : true;

  // console.log('isQuestionStatusValid', isQuestionStatusValid);

  const getSurveyQuestionById = useGetSurveyQuestionById();
  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }

  const { questionType } = question;

  /**
   * 설문조사 질문 타입 변경 핸들러
   */
  const handleSelectBoxClick = (value: string) => {
    const selectValue = value as InputSurveyQuestionType;
    handleQuestionTypeChange(questionId, selectValue);
  };

  return (
    <div
      className={clsx(
        'w-668pxr px-20pxr py-24pxr rounded-4pxr shadow-survey-form relative flex shrink-0 flex-col items-start border-2 bg-white',
        isQuestionStatusValid ? 'border-stroke-200' : 'border-system-red',
      )}
    >
      {/* 설문 생성 시에만 상단 바 표시 */}
      {situation === SurveySituation.CREATING_SURVEY && (
        <MovingBarSurvey
          className="absolute top-0 left-0"
          onClick={() => console.log('아쉽게도, 아직 없습니다.')}
        />
      )}

      <div className="gap-20pxr flex w-full flex-col items-start">
        {/* 상단 부분 */}
        <div className="w-628pxr flex items-end justify-between">
          <InputSurveyQuestionTitle questionId={questionId} />

          {/* 질문 타입을 변경할 수 있는 드롭다운 입니다. */}
          {/* 설문 생성 시에만 변경할 수 있도록 조건부로 렌더링 합니다. */}
          {situation === SurveySituation.CREATING_SURVEY && (
            <SelectBoxOption
              options={selectBoxOptions}
              initState={questionType || selectBoxOptions[0].state}
              onClick={handleSelectBoxClick}
              className="w-100pxr"
            />
          )}
        </div>

        {/* 질문에 대한 옵션들이나 항목들이 있는 main part 입니다. */}
        <QuestionSurvey questionId={questionId} />
      </div>

      {/*질문 생성 시에만 필수 여부 및 삭제 버튼 등이 활성화될 수 있도록 조건부로 렌더링 합니다.*/}
      <div className="h-27pxr mt-20pxr flex w-full flex-row justify-between">
        <span className="text-cap1-rg text-system-red items-start">{questionScopeMessage}</span>

        {situation === SurveySituation.CREATING_SURVEY && (
          <div className="items-end">
            <ButtonsSurvey questionId={questionId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSurveyQuestion;
