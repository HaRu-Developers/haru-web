'use client';

import { useState } from 'react';

import { clsx } from 'clsx';

import CheckboxIcons from '@icons/CheckboxIcons/CheckboxIcons';
import { CheckboxIconsState } from '@icons/CheckboxIcons/CheckboxIcons.types';
import WarningIcon from '@icons/WarningIcon/WarningIcon.server';

import {
  useGetSurveyQuestionById,
  useIsDuplicateOptionInQuestion,
  useRemoveSurveyQuestionOption,
  useSetCheckedOptionList,
  useSetSurveyQuestionOption,
  useSurveySituation,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import OptionDeleteButton from '@features/team-mood-tracker/components/create-survey-page/OptionDeleteButton/OptionDeleteButton.client';

import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';
import { QuestionOptionProps } from './QuestionChoiceOption.types';

const QuestionOption = ({ questionId, optionId }: QuestionOptionProps) => {
  const [isOptionValid, setIsOptionValid] = useState<boolean>(true);
  const situation = useSurveySituation();
  const getSurveyQuestionById = useGetSurveyQuestionById();
  const handleQuestionOptionCheck = useSetCheckedOptionList();
  const handleOptionListChange = useSetSurveyQuestionOption();
  const removeQuestionOption = useRemoveSurveyQuestionOption();
  const checkDuplicateOption = useIsDuplicateOptionInQuestion();
  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }

  const { questionType, multipleOrCheckboxOptions: optionList, checkedOptionList } = question;
  const currentOption = optionList.find((option) => option.id === optionId);
  if (!currentOption) {
    throw new Error('WRONG OPTION ID'); // 옵션이 없을 경우 렌더링하지 않음
  }

  const isParticipatingSurvey = situation === SurveySituation.PARTICIPATING_SURVEY;
  const isCreatingSurvey = situation === SurveySituation.CREATING_SURVEY;

  const handleClick = () => {
    // 설문에 참여하고 있지 않다면 클릭 이벤트를 무시합니다.
    if (!isParticipatingSurvey) return;

    if (questionType === InputSurveyQuestionType.CHECKBOX) {
      if (checkedOptionList.includes(currentOption)) {
        handleQuestionOptionCheck(
          questionId,
          checkedOptionList.filter((option) => option.id !== optionId),
        );
      } else {
        handleQuestionOptionCheck(questionId, [...checkedOptionList, currentOption]);
      }
    } else if (questionType === InputSurveyQuestionType.CHOICE) {
      if (checkedOptionList.includes(currentOption)) {
        // 이미 선택된 옵션을 클릭하면 선택을 해제합니다.
        handleQuestionOptionCheck(
          questionId,
          checkedOptionList.filter((option) => option.id !== optionId),
        );
      } else {
        handleQuestionOptionCheck(questionId, [currentOption]);
      }
    }
  };

  const optionNameChange = (value: string) => {
    if (!isCreatingSurvey) return; // 설문을 생성하는 상황이 아닐 경우 변경하지 않습니다.
    handleOptionListChange(
      questionId,
      optionList.map((option) => {
        if (option.id === optionId) {
          return { ...option, content: value }; // 현재 옵션의 내용을 변경합니다.
        }
        return option; // 다른 옵션은 그대로 유지합니다.
      }),
    );
  };

  const isCheckboxSelected = checkedOptionList.some((option) => option.id === optionId);

  const iconState = () => {
    if (questionType === InputSurveyQuestionType.CHOICE) {
      return isCheckboxSelected
        ? CheckboxIconsState.CIRCLE_CHECKBOX_ENABLED
        : CheckboxIconsState.CIRCLE_CHECKBOX_DISABLED;
    } else if (questionType === InputSurveyQuestionType.CHECKBOX) {
      return isCheckboxSelected
        ? CheckboxIconsState.SQUARE_CHECKBOX_ENABLED
        : CheckboxIconsState.SQUARE_CHECKBOX_DISABLED;
    }

    throw new Error('WRONG QUESTION TYPE'); // 잘못된 질문 타입
  };

  const handleOptionNameChange = (value: string) => {
    optionNameChange(value);
    // value가 없을 떄는 무조건 valid여야 함
    if (!value) {
      return setIsOptionValid(true);
    }
    setIsOptionValid(!checkDuplicateOption(questionId, optionId));

    console.log('isOptionValid:', !checkDuplicateOption(questionId, optionId));
  };

  return (
    <div key={questionId} className={clsx('group gap-6pxr rounded-4pxr flex w-full items-center')}>
      <div onClick={handleClick}>
        <CheckboxIcons
          state={iconState()}
          className={clsx(
            'select-none',
            !isParticipatingSurvey ? 'cursor-default' : 'cursor-pointer',
          )}
        />
      </div>
      <input
        className={clsx(
          'text-b4-rg h-22pxr w-full border-b text-black outline-none select-none',
          !isParticipatingSurvey && 'cursor-default',
          !isOptionValid ? 'border-system-red' : 'border-transparent',
        )}
        value={currentOption.content}
        placeholder={`옵션 ${optionList.indexOf(currentOption) + 1}`}
        onChange={(e) => handleOptionNameChange(e.target.value)}
        // 설문을 생성하는 경우를 제외하고는 readOnly로 설정합니다.
        readOnly={!isCreatingSurvey}
      />
      {/* 설문 생성 중일 때 */}
      {situation === SurveySituation.CREATING_SURVEY ? (
        !isOptionValid ? (
          // 설문 생성 중이고, 옵션이 유효하지 않은 경우
          <div className="group">
            <WarningIcon className="flex group-hover:hidden" />
            <OptionDeleteButton
              className="ml-auto hidden group-hover:flex"
              onClick={() => removeQuestionOption(questionId, optionId)}
            />
          </div>
        ) : (
          // 설문 생성 중이고, 옵션이 유효한 경우
          <OptionDeleteButton
            className="ml-auto hidden group-hover:flex"
            onClick={() => removeQuestionOption(questionId, optionId)}
          />
        )
      ) : // 설문을 참여중이지 않은 다른 모든 상태
      null}
    </div>
  );
};

export default QuestionOption;
