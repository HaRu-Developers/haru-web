'use client';

import { Dispatch, SetStateAction } from 'react';

import { SurveyQuestionTypeOnPost } from '@api/team-mood-tracker/apis.types';
import { useViewSurveyQuestion } from '@api/team-mood-tracker/get/queries/useViewSurveyQuestion';

import InputSurveyQuestion from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.client';
import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

import TeamMoodTrackerFilePageSectionSkeleton from '@features/team-mood-tracker/components/skeletons/TeamMoodTrackerFilePageSectionSkeleton/TeamMoodTrackerFilePageSectionSkeleton.server';

interface TeamMoodSurveyQuestionSectionProps {
  moodTrackerHashedId: string;
  setSurveyUserResponse: Dispatch<SetStateAction<SurveyQuestionTypeOnPost[]>>;
}

const ParticipateInQuestions = ({
  moodTrackerHashedId,
  setSurveyUserResponse,
}: TeamMoodSurveyQuestionSectionProps) => {
  const { data: surveyQuestionResponse, isLoading } = useViewSurveyQuestion(moodTrackerHashedId);

  if (!surveyQuestionResponse || isLoading) {
    console.log(
      '[TEAM_MOOD_TRACKER] 설문 문항 로딩 중',
      moodTrackerHashedId,
      surveyQuestionResponse,
      isLoading,
    );
    return <TeamMoodTrackerFilePageSectionSkeleton />;
  }

  const surveyQuestionList = surveyQuestionResponse.questionList;

  /**
   * API 응답 내에서 questionIndex를 받아서, 해당 질문의 optionListIndex에 따라서 optionId를 반환해줍니다.
   * optionList 에서 index에 따라 optionId를 반환해줍니다.
   */
  const getChoiceIdByOptionIndex = (questionIndex: number, optionListIndex: number) => {
    const question = surveyQuestionList[questionIndex];

    if (question.type === TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE) {
      return question.multipleChoiceList[optionListIndex].multipleChoiceId;
    } else if (question.type === TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE) {
      return question.checkboxChoiceList[optionListIndex].checkboxChoiceId; // 첫 번째 체크박스 선택지의 ID를 반환
    }
    throw new Error(`Invalid question type: ${optionListIndex} ${question.type}`);
    // return 'INVALID_CHOICE_ID'; // 잘못된 선택지 ID
  };

  /**
   * 사용자가 주관식 문항에 대한 응답을 변경할 때 호출되는 함수입니다.
   */
  const handleEachSubjectiveResponseChange = (questionId: string, userResponse: string) => {
    setSurveyUserResponse((prev) => {
      const updatedUserResponses = [...prev];

      // useState로 관리하는건, API 응답을 보내기 위해 대기하는 공간과 비슷합니다.
      // 해당 state 안에 변경하고자 하는 questionId가 있다면, 해당 값을 바꾸고 아니면 생성하는 로직을 구성합니다.
      const existingResponseIndex = updatedUserResponses.findIndex(
        (response) => response.questionId === questionId,
      );

      // questionId에 해당하는 값이 userResponse에 없다면, 새로운 객체를 생성해서 넣어줍니다.
      // ex. 처음 응답하는 경우가 이에 해당합니다.
      if (existingResponseIndex === -1) {
        // 해당 questionId가 없다면, 새로운 응답을 추가합니다.
        const newResponse: SurveyQuestionTypeOnPost = {
          questionId: questionId,
          type: TeamMoodTrackerSurveyQuestionType.SUBJECTIVE,
          subjectiveAnswer: userResponse, // SUBJECTIVE 타입은 response가 string입니다.
        };

        updatedUserResponses.push(newResponse);
        return updatedUserResponses;
      }
      // questionId에 해당하는 값이 있다면, 기존 응답을 업데이트합니다.
      // ex. 이미 응답한 질문에 대한 수정을 하는 경우가 해당합니다.
      else if (existingResponseIndex >= 0) {
        const existingResponse = updatedUserResponses[existingResponseIndex];

        // 객체의 타입을 직접 확인하여 좁혀줍니다.
        if (existingResponse.type === TeamMoodTrackerSurveyQuestionType.SUBJECTIVE) {
          updatedUserResponses[existingResponseIndex] = {
            ...existingResponse,
            subjectiveAnswer: userResponse,
          };
        } else {
          console.error(
            `Question with ID ${questionId} is not of type SUBJECTIVE, cannot update response.`,
          );
        }

        // 만약 questionId에 해당하는 질문의 type가 SUBJECTIVE가 아니라면, 아무것도 하지 않고 그대로 반환합니다.
        return updatedUserResponses;
      }

      return updatedUserResponses;
    });
  };

  /**
   * 사용자가 객관식 또는 복수선택 문항에 대한 응답을 변경할 때 호출되는 함수입니다.
   * optionIndexList는 사용자가 선택한 옵션의 인덱스 리스트입니다.
   */
  const handleQuestionOptionClick = (questionId: string, optionIndexList: number[]) => {
    setSurveyUserResponse((prev) => {
      const updatedUserResponses = [...prev];

      // 해당 questionId에 사용자가 이미 응답한 적이 있는지 확인합니다.
      const existingResponseIndex = updatedUserResponses.findIndex(
        (response) => response.questionId === questionId,
      );

      const questionIndex = surveyQuestionList.findIndex(
        (question) => question.questionId === questionId,
      );

      // 만약 해당 questionId가 surveyQuestionList에 없다면, 에러를 출력하고 반환합니다. (그러면 안됨)
      if (questionIndex === -1) {
        console.error(`Question with ID ${questionId} not found in surveyQuestionList.`);
        return updatedUserResponses;
      }

      // API 응답에서 questionId에 해당하는 질문의 타입을 가져옵니다.
      const questionType = surveyQuestionList[questionIndex].type;

      // 사용자가 선택을 취소한 경우, 빈 배열이 되는 것에 유의하여야 합니다.
      const userSelectedOptionList = optionIndexList.map((index) =>
        getChoiceIdByOptionIndex(questionIndex, index),
      );

      /**
       * 사용자가 선택한 옵션이 없는 경우 (선택을 취소한 경우)
       * 기존에 응답한 경우가 있다면 (but 빈 배열이 오려면 당연히 기존에 값이 있어야 하긴 함)
       * 해당 questionId에 대한 응답을 삭제합니다.
       */
      if (userSelectedOptionList.length === 0) {
        if (existingResponseIndex !== -1) {
          updatedUserResponses.splice(existingResponseIndex, 1);
        }

        return updatedUserResponses;
      }

      // 예외 처리는 상단에서 완료되어야 합니다.

      // 객관식 문제인 경우
      if (questionType === TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE) {
        // 만약 해당 questionId가 없다면, 새로운 응답을 추가합니다.
        if (existingResponseIndex === -1) {
          const newResponse: SurveyQuestionTypeOnPost = {
            questionId: questionId,
            type: TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE,
            multipleChoiceId: userSelectedOptionList[0], // 응답이 없는 경우는 상단에서 처리하였습니다.
          };

          updatedUserResponses.push(newResponse);
        } else {
          // 이미 존재한다면, 해당 응답을 업데이트합니다.
          const existingResponse = updatedUserResponses[existingResponseIndex];
          // type-safety를 위한 guard
          if (existingResponse.type === TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE) {
            updatedUserResponses[existingResponseIndex] = {
              ...existingResponse,
              multipleChoiceId: userSelectedOptionList[0],
            };
          } else {
            console.error(
              `Question with ID ${questionId} is not of type MULTIPLE_CHOICE, cannot update response.`,
            );
          }
        }
      }
      // 복수선택 문제인 경우
      else if (questionType === TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE) {
        // 만약 해당 questionId가 없다면, 새로운 응답을 추가합니다.
        if (existingResponseIndex === -1) {
          const newResponse: SurveyQuestionTypeOnPost = {
            questionId: questionId,
            type: TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE,
            checkboxChoiceIdList: userSelectedOptionList, // 복수선택이므로 배열로 저장합니다.
          };

          updatedUserResponses.push(newResponse);
        } else {
          // 이미 존재한다면, 해당 응답을 업데이트합니다.
          const existingResponse = updatedUserResponses[existingResponseIndex];
          // type-safety를 위한 guard
          if (existingResponse.type === TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE) {
            updatedUserResponses[existingResponseIndex] = {
              ...existingResponse,
              checkboxChoiceIdList: userSelectedOptionList,
            };
          } else {
            console.error(
              `Question with ID ${questionId} is not of type CHECKBOX_CHOICE, cannot update response.`,
            );
          }
        }
      }

      // 최종적으로 수정한 배열을 반환합니다.
      return updatedUserResponses;
    });
  };

  /**
   * 최종적으로 컴포넌트에 한 번에 전달하기 위한 핸들러 모음, questionId를 기반으로 생성합니다.
   */
  const surveyQuestionHandlerSet = (questionId: string) => {
    return {
      onSubjectiveQuestionResponseChange: (val: string) =>
        handleEachSubjectiveResponseChange(questionId, val),
      onQuestionOptionCheck: (indexList: number[]) =>
        handleQuestionOptionClick(questionId, indexList),
    };
  };

  return (
    <div className="gap-y-14pxr mt-15pxr flex flex-col">
      {surveyQuestionList.map((singleQuestion) => {
        let options: string[] = [];
        if (singleQuestion.type === TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE) {
          options = singleQuestion.multipleChoiceList.map((choice) => choice.content);
        } else if (singleQuestion.type === TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE) {
          options = singleQuestion.checkboxChoiceList.map((choice) => choice.content);
        } else if (singleQuestion.type === TeamMoodTrackerSurveyQuestionType.SUBJECTIVE) {
          options = []; // 주관식은 선택지가 없으므로 빈 배열
        }
        return (
          <InputSurveyQuestion
            key={singleQuestion.questionId}
            questionTitle={singleQuestion.questionTitle}
            questionTitlePlaceholder="현재 문항에 제목이 존재하지 않습니다."
            questionType={singleQuestion.type as unknown as InputSurveyQuestionType}
            multipleOrCheckboxOptions={options}
            surveyComponentUsingSituation={SurveySituation.PARTICIPATING_SURVEY}
            isQuestionMandatory={singleQuestion.isMandatory}
            handlers={surveyQuestionHandlerSet(singleQuestion.questionId)}
          />
        );
      })}
    </div>
  );
};

export default ParticipateInQuestions;
