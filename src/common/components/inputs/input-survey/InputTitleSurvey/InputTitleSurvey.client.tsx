'use client';

import React from 'react';

import clsx from 'clsx';

import {
  useGetSurveyQuestionById,
  useSetSurveyQuestionTitle,
  useSurveySituation,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import { SurveySituation } from '../types/input-survey.common.types';
import { InputSurveyQuestionTitleProps } from './InputTitleSurvey.types';

/**
 * 설문조사 문항의 제목 부분에 해당하는 컴포넌트 입니다.
 */
const InputSurveyQuestionTitle = ({ questionId, className }: InputSurveyQuestionTitleProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleQuestionTitleChange(questionId, e.target.value);
  };

  const getSurveyQuestionById = useGetSurveyQuestionById();
  const situation = useSurveySituation();
  const handleQuestionTitleChange = useSetSurveyQuestionTitle();

  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }

  const { questionTitle, questionTitlePlaceholder } = question;

  /**
   * 설문조사 생성 상황인지 여부를 판단합니다.
   */
  const isCreatingSurvey = situation === SurveySituation.CREATING_SURVEY;

  return (
    <div
      className={clsx(
        'min-w-517pxr gap-6pxr flex shrink-0 flex-col items-start',
        situation !== SurveySituation.CREATING_SURVEY && 'w-full',
        className,
      )}
    >
      <input
        className={clsx('w-full self-stretch text-black placeholder-gray-400 outline-none', {
          'text-b1-rg': !questionTitle, // 제목이 없을 떄 (placeholder) 의 타이포그래피
          'text-t5-sb': questionTitle, // 제목이 있을 떄 (입력 중일 때) 의 타이포그래피
          'cursor-default': !isCreatingSurvey,
        })}
        value={questionTitle}
        onChange={handleOnChange}
        placeholder={questionTitlePlaceholder}
        readOnly={!isCreatingSurvey}
      />
      <div className="border-stroke-200 w-full border-t" />
    </div>
  );
};

export default InputSurveyQuestionTitle;
