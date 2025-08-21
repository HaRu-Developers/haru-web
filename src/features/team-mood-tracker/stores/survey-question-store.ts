import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  CreateSurveyQuestion,
  GetSurveyQuestionListResponseDto,
  SurveyQuestionTypeOnPost,
} from '@api/team-mood-tracker/apis.types';

import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

import { TeamMoodTrackerSurveyQuestionType } from '@features/team-mood-tracker/constants/question.constants';

export interface QuestionOptions {
  id: string;
  content: string;
}
// 개별 질문의 타입을 정의합니다. 기존 타입을 확장하여 id를 추가합니다.
export interface SurveyQuestion {
  // 해당 질문의 고유한 ID입니다. 설문 생성 시에는 UUID로 부여되며, API Response의 경우 해당 값 내의 ID를 사용합니다.
  id: string;
  // 질문의 제목입니다.
  questionTitle: string;
  // 질문 제목이 입력되기 전 상태일 때의 placeholder 입니다.
  questionTitlePlaceholder?: string;
  // 질문 유형입니다.
  questionType: InputSurveyQuestionType;
  /**
   * 객관식 또는 체크박스 질문의 선택지 목록입니다.
   *
   * 질문 목록을 받는 경우에는 id값도 포함되어 있으니 데이터 처리에 유의하여야 합니다.
   */
  multipleOrCheckboxOptions: QuestionOptions[];
  // 해당 질문의 필수 응답 여부 입니다.
  isQuestionMandatory: boolean;
  // 주관식 문항일 경우 해당 문항에 대한 답변입니다.
  subjectiveQuestionDescription: string;
  // 설문 응답 시 사용자가 선택한 옵션 목록입니다.
  checkedOptionList: QuestionOptions[];
}

// 스토어의 상태(state) 타입을 정의합니다.
interface SurveyStoreState {
  questions: SurveyQuestion[];
  // 컴포넌트 사용 상황에 따른 구분입니다. 설문 당 한 건 존재하며, 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation: SurveySituation;
}

// 스토어의 액션(actions) 타입을 정의합니다.
interface SurveyStoreActions {
  setQuestions: (questions: SurveyQuestion[]) => void;
  getQuestionIdByIndex: (index: number) => string;
  addQuestion: () => void;
  removeQuestion: (id: string) => void;
  updateQuestion: (id: string, updates: Partial<Omit<SurveyQuestion, 'id'>>) => void;
  updateOption: (questionId: string, optionId: string, value: string) => void;
  addOption: (questionId: string, newOption: QuestionOptions) => void;
  removeOption: (questionId: string, optionId: string) => void;
  setOption: (questionId: string, optionList: QuestionOptions[]) => void;
  setSubjectiveQuestionResponse: (questionId: string, response: string) => void;
  setQuestionTitle: (questionId: string, title: string) => void;
  toggleIsQuestionMandatory: (questionId: string) => void;
  setSurveyComponentUsingSituation: (situation: SurveySituation) => void;
  setCheckedOptionList: (questionId: string, checkedOptionList: QuestionOptions[]) => void;
  setQuestionType: (questionId: string, questionType: InputSurveyQuestionType) => void;
  getQuestionById: (questionId: string) => SurveyQuestion | null;
  transferQuestionsToCreateSurveyRequestFormat: () => CreateSurveyQuestion[];
  setQuestionsFromApiFormat: (questions: GetSurveyQuestionListResponseDto) => void;
  transferQuestionsToParticipateSurveyRequestFormat: () => SurveyQuestionTypeOnPost[];
}

export const surveyQuestionStore = create<SurveyStoreState & SurveyStoreActions>()(
  devtools(
    immer((set, get) => ({
      questions: [
        {
          id: uuidv4(),
          questionTitle: '',
          questionTitlePlaceholder: '문항의 제목을 입력하세요.',
          questionType: InputSurveyQuestionType.CHOICE,
          multipleOrCheckboxOptions: [{ id: uuidv4(), content: '' }],
          isQuestionMandatory: false,
          checkedOptionList: [],
          subjectiveQuestionDescription: '',
        },
      ],
      surveyComponentUsingSituation: SurveySituation.CREATING_SURVEY,

      /**
       * API 응답으로 questionList를 구성하고자 하는 경우, 이 액션을 사용하면 됩니다.
       * @param questions
       */
      setQuestions: (questions) => set({ questions }),

      /**
       * 주어진 인덱스에 해당하는 질문의 ID를 반환합니다.
       * 만약 인덱스가 범위를 벗어나면 null을 반환합니다
       * @param index
       */
      getQuestionIdByIndex: (index: number) => {
        const question = get().questions[index];
        if (!question) {
          throw new Error(`Question at index ${index} does not exist.`);
        }
        return question.id;
      },

      // TODO: 추가되는 질문의 type를 마지막 질문으로 변경
      /**
       * 새로운 질문을 추가합니다.
       */
      addQuestion: () =>
        set((state) => ({
          questions: [
            ...state.questions,
            {
              id: uuidv4(),
              questionTitle: '',
              questionTitlePlaceholder: '문항의 제목을 입력하세요.',
              questionType: InputSurveyQuestionType.CHOICE,
              multipleOrCheckboxOptions: [{ id: uuidv4(), content: '' }],
              isQuestionMandatory: false,
              checkedOptionList: [],
              subjectiveQuestionDescription: '',
            },
          ],
        })),

      /**
       * 질문을 제거합니다.
       * @param id 질문의 ID 입니다.
       */
      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),

      /**
       * 질문을 업데이트합니다.
       * @param id
       * @param updates 질문에 적용할 업데이트 내용입니다. id를 제외한 SurveyQuestion의 속성을 포함한 객체입니다.
       *
       * @example
       * ```ts
       * updateQuestion('1234', { questionTitle: '새로운 질문 제목' });
       * ```
       */
      updateQuestion: (id, updates) =>
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        })),

      /**
       * 질문 내의 옵션을 변경합니다.
       */
      updateOption: (questionId, optionId, value) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  multipleOrCheckboxOptions: q.multipleOrCheckboxOptions.map((opt) =>
                    opt.id === optionId ? value : opt,
                  ),
                }
              : q,
          ),
        })),

      /**
       * 옵션을 추가합니다.
       */
      addOption: (questionId, newOption) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId
              ? { ...q, multipleOrCheckboxOptions: [...q.multipleOrCheckboxOptions, newOption] }
              : q,
          ),
        })),

      removeOption: (questionId, optionId) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  multipleOrCheckboxOptions: q.multipleOrCheckboxOptions.filter(
                    (opt) => opt.id !== optionId,
                  ),
                }
              : q,
          ),
        })),

      setOption: (questionId, optionList) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, multipleOrCheckboxOptions: optionList } : q,
          ),
        })),

      setSubjectiveQuestionResponse: (questionId, response) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, subjectiveQuestionDescription: response } : q,
          ),
        })),

      setQuestionTitle: (questionId, title) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, questionTitle: title } : q,
          ),
        })),

      toggleIsQuestionMandatory: (questionId) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, isQuestionMandatory: !q.isQuestionMandatory } : q,
          ),
        })),

      setSurveyComponentUsingSituation: (situation) =>
        set({
          surveyComponentUsingSituation: situation,
        }),

      setCheckedOptionList: (questionId, checkedOptionList) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, checkedOptionList: checkedOptionList } : q,
          ),
        })),

      setQuestionType: (questionId, questionType) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, questionType: questionType } : q,
          ),
        })),

      getQuestionById: (questionId) => get().questions.find((q) => q.id === questionId) || null,

      transferQuestionsToCreateSurveyRequestFormat: () => {
        const questions: CreateSurveyQuestion[] = get().questions.map((q) => ({
          title: q.questionTitle,
          type: q.questionType,
          isMandatory: q.isQuestionMandatory,
          options: q.multipleOrCheckboxOptions.map((opt) => opt.content),
        }));

        return questions;
      },

      setQuestionsFromApiFormat: (apiData) => {
        const questions = apiData.questionList;
        const formatted = questions.map((q) => {
          return {
            id: q.questionId,
            questionTitle: q.questionTitle,
            questionTitlePlaceholder: '입력된 문항의 제목이 존재하지 않습니다.',
            questionType: q.type as unknown as InputSurveyQuestionType,
            multipleOrCheckboxOptions:
              q.type === TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE
                ? q.multipleChoiceList.map((choice) => ({
                    id: choice.multipleChoiceId,
                    content: choice.content,
                  }))
                : q.type === TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE
                  ? q.checkboxChoiceList.map((choice) => ({
                      id: choice.checkboxChoiceId,
                      content: choice.content,
                    }))
                  : [],
            isQuestionMandatory: q.isMandatory,
            subjectiveQuestionDescription: '',
            checkedOptionList: [],
          };
        });
        set({ questions: formatted });
      },

      transferQuestionsToParticipateSurveyRequestFormat: () => {
        const questions: SurveyQuestionTypeOnPost[] = get().questions.map((q) => {
          if (q.questionType === InputSurveyQuestionType.CHOICE) {
            return {
              questionId: q.id,
              type: TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE,
              multipleChoiceId: q.multipleOrCheckboxOptions.map((opt) => opt.id)[0],
            };
          } else if (q.questionType === InputSurveyQuestionType.CHECKBOX) {
            return {
              questionId: q.id,
              type: TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE,
              checkboxChoiceIdList: q.multipleOrCheckboxOptions.map((opt) => opt.id),
            };
          } else if (q.questionType === InputSurveyQuestionType.SUBJECT) {
            return {
              questionId: q.id,
              type: TeamMoodTrackerSurveyQuestionType.SUBJECTIVE,
              subjectiveAnswer: q.subjectiveQuestionDescription,
            };
          } else {
            throw new Error('FUCKED UP QUESTION TYPE');
          }
        });

        return questions;
      },
    })),
    { name: 'SurveyQuestionStore' },
  ),
);
