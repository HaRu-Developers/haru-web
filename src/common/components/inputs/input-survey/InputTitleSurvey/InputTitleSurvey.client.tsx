'use client';

import React from 'react';

import clsx from 'clsx';

import { SurveySituation } from '../types/input-survey.common.types';
import { InputSurveyQuestionTitleProps } from './InputTitleSurvey.types';

/**
 * 설문조사 문항의 제목 부분에 해당하는 컴포넌트 입니다.
 * @param title
 * @param placeholder
 * @param visibility
 * @param onChange
 * @param className
 * @constructor
 */
const InputSurveyQuestionTitle = ({
  title,
  placeholder = '문항의 제목을 입력하세요.',
  visibility = SurveySituation.PARTICIPATING_SURVEY,
  onChange,
  className,
}: InputSurveyQuestionTitleProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  /**
   * 설문조사 생성 상황인지 여부를 판단합니다.
   */
  const isCreatingSurvey = visibility === SurveySituation.CREATING_SURVEY;

  return (
    <div className={clsx('min-w-517pxr gap-6pxr flex shrink-0 flex-col items-start', className)}>
      <input
        className={clsx('w-full self-stretch text-black placeholder-gray-400 outline-none', {
          'text-b1-rg': !title, // 제목이 없을 떄 (placeholder) 의 타이포그래피
          'text-t5-sb': title, // 제목이 있을 떄 (입력 중일 때) 의 타이포그래피
          'cursor-default': !isCreatingSurvey,
        })}
        value={title}
        onChange={handleOnChange}
        placeholder={placeholder}
        readOnly={!isCreatingSurvey}
      />
      <div className="border-stroke-200 w-full border-t" />
    </div>
  );
};

export default InputSurveyQuestionTitle;
