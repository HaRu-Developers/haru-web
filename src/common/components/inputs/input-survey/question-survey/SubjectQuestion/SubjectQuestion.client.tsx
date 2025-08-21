'use client';

import { useEffect, useRef } from 'react';

import {
  useGetSurveyQuestionById,
  useSetSubjectiveQuestionResponse,
  useSurveySituation,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import { SurveySituation } from '../../types/input-survey.common.types';
import { SubjectQuestionProps } from './SubjectQuestion.types';

const SubjectQuestion = ({ questionId }: SubjectQuestionProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubjectiveQuestionResponseChange = useSetSubjectiveQuestionResponse();
  const situation = useSurveySituation();

  const getSurveyQuestionById = useGetSurveyQuestionById();
  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }
  const { subjectiveQuestionDescription } = question;

  const handleResize = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto'; // 높이 초기화
    el.style.height = `${el.scrollHeight}px`; // 내용 높이에 맞게 조절
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleSubjectiveQuestionResponseChange(questionId, e.target.value);
    handleResize();
  };

  useEffect(() => {
    handleResize();
  }, [subjectiveQuestionDescription]);

  return (
    <textarea
      ref={textareaRef}
      value={subjectiveQuestionDescription}
      placeholder="주관식 내용을 입력해주세요."
      rows={1}
      onInput={handleResize}
      onChange={handleChange}
      className="min-h-18pxr text-b3-rg w-full resize-none overflow-hidden outline-none"
      // 설문조사에 응하고 있지 않다면, readOnly가 되도록 합니다.
      readOnly={situation !== SurveySituation.PARTICIPATING_SURVEY}
    />
  );
};

export default SubjectQuestion;
