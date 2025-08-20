'use client';

import { useEffect, useRef } from 'react';

import { SurveySituation } from '../../types/input-survey.common.types';
import { SubjectQuestionProps } from './SubjectQuestion.types';

const SubjectQuestion = ({
  subjectiveQuestionResponse,
  surveyComponentUsingSituation,
  onSubjectiveQuestionResponseChange,
}: SubjectQuestionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto'; // 높이 초기화
    el.style.height = `${el.scrollHeight}px`; // 내용 높이에 맞게 조절
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSubjectiveQuestionResponseChange?.(e.target.value);
    handleResize();
  };

  useEffect(() => {
    handleResize();
  }, [subjectiveQuestionResponse]);

  return (
    <textarea
      ref={textareaRef}
      value={subjectiveQuestionResponse}
      placeholder="주관식 내용을 입력해주세요."
      rows={1}
      onInput={handleResize}
      onChange={handleChange}
      className="min-h-18pxr text-b3-rg w-full resize-none overflow-hidden outline-none"
      // 설문조사에 응하고 있지 않다면, readOnly가 되도록 합니다.
      readOnly={surveyComponentUsingSituation !== SurveySituation.PARTICIPATING_SURVEY}
    />
  );
};

export default SubjectQuestion;
