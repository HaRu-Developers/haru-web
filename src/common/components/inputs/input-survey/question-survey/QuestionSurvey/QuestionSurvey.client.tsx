'use client';

import { v4 as uuidv4 } from 'uuid';

import {
  useAddSurveyQuestionOption,
  useGetSurveyQuestionById,
  useSetCheckedOptionList,
  useSetSubjectiveQuestionResponse,
  useSetSurveyQuestionOption,
  useSurveySituation,
} from '@features/team-mood-tracker/hooks/stores/useSurveyQuestionStore';

import { InputSurveyQuestionType, SurveySituation } from '../../types/input-survey.common.types';
import AddQuestion from '../AddQuestion/AddQuestion.client';
import QuestionOptions from '../QuestionOptions/QuestionOptions.client';
import SubjectQuestion from '../SubjectQuestion/SubjectQuestion.client';
import { QuestionSurveyProps } from './QuestionSurvey.types';

const QuestionSurvey = ({ questionId }: QuestionSurveyProps) => {
  const handleOptionListChange = useSetSurveyQuestionOption();
  const handleAddOption = useAddSurveyQuestionOption();
  const getSurveyQuestionById = useGetSurveyQuestionById();
  const handleQuestionOptionCheck = useSetCheckedOptionList();
  const situation = useSurveySituation();
  const question = getSurveyQuestionById(questionId);
  // assurance guard
  if (!question) {
    throw new Error('WRONG QUESTION ID'); // 질문이 없을 경우 렌더링하지 않음
  }

  const { questionType, multipleOrCheckboxOptions: optionList } = question;

  /**
   * 질문에 새로운 옵션을 추가합니다.
   */
  const insertOption = (newOption: string) => {
    handleAddOption(questionId, {
      id: uuidv4(), // 새로운 옵션에 대한 고유 ID 생성
      content: newOption,
    });
  };

  /**
   * 옵션 추가 버튼에 대한 핸들링을 합니다.
   *
   * 빈 문자열을 추가하여, placeholder가 표출되도록 합니다.
   */
  const handleAddOptionClick = () => {
    insertOption('');
  };

  // 주관식 질문일 경우에 대한 return 입니다.
  // 제목만 수정 가능합니다.
  if (questionType === InputSurveyQuestionType.SUBJECT) {
    return (
      <div className="w-full">
        <SubjectQuestion questionId={questionId} />
      </div>
    );
  }

  // 기타 경우 (체크박스, 주관식) 에 대한 컴포넌트 입니다.
  return (
    <div className="w-full">
      <QuestionOptions questionId={questionId} />
      {/*설문을 생성하는 상황에서는 항목을 추가할 수 있는 컴포넌트를 추가로 렌더링 해줍니다.*/}
      {situation === SurveySituation.CREATING_SURVEY && (
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
