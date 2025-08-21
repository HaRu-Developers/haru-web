'use client';

import QuestionOption from '@common/components/inputs/input-survey/question-survey/QuestionChoiceOption/QuestionChoiceOption.client';

import { useGetSurveyQuestionById } from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import { QuestionOptionsProps } from './QuestionOptions.types';

const QuestionOptions = ({ questionId }: QuestionOptionsProps) => {
  const getSurveyQuestionById = useGetSurveyQuestionById();
  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }
  const { multipleOrCheckboxOptions: optionList } = question;

  return (
    <div className="gap-y-12pxr flex flex-col">
      {optionList.map((option) => (
        <QuestionOption key={option.id} questionId={questionId} optionId={option.id} />
      ))}
    </div>
  );
};

export default QuestionOptions;
