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
  isSurveyResponseValidWhenParticipating: () => boolean;
  isQuestionResponseValidWhenParticipating: (questionId: string) => boolean;
  isCreatedSurveyValid: () => boolean;
  isDuplicateOptionInQuestion: (questionId: string, optionId: string) => boolean;
  isQuestionValid: (questionId: string) => boolean;
  isQuestionHasTitleAndValidOptions: (questionId: string) => boolean;
  resetQuestionsAndCreatingSurveySituation: () => void;
}

const defaultSurveyQuestion = (): SurveyQuestion => ({
  id: uuidv4(),
  questionTitle: '',
  questionTitlePlaceholder: '문항의 제목을 입력하세요.',
  questionType: InputSurveyQuestionType.CHOICE,
  multipleOrCheckboxOptions: [{ id: uuidv4(), content: '' }],
  isQuestionMandatory: false,
  checkedOptionList: [],
  subjectiveQuestionDescription: '',
});

const presetSurveyQuestions: SurveyQuestion[] = [
  {
    id: uuidv4(),
    questionTitle: '팀의 분위기를 어떻게 느끼시나요?',
    questionTitlePlaceholder: '문항의 제목을 입력하세요.',
    questionType: InputSurveyQuestionType.CHOICE,
    multipleOrCheckboxOptions: [
      { id: uuidv4(), content: '매우 만족' },
      { id: uuidv4(), content: '만족' },
      { id: uuidv4(), content: '보통' },
      { id: uuidv4(), content: '불만족' },
      { id: uuidv4(), content: '매우 불만족' },
    ],
    isQuestionMandatory: false,
    checkedOptionList: [],
    subjectiveQuestionDescription: '',
  },
  {
    id: uuidv4(),
    questionTitle: '이번 달 업무 분배에 대한 만족도를 선택해 주세요.',
    questionTitlePlaceholder: '문항의 제목을 입력하세요.',
    questionType: InputSurveyQuestionType.CHOICE,
    multipleOrCheckboxOptions: [
      { id: uuidv4(), content: '매우 만족' },
      { id: uuidv4(), content: '만족' },
      { id: uuidv4(), content: '보통' },
      { id: uuidv4(), content: '불만족' },
      { id: uuidv4(), content: '매우 불만족' },
    ],
    isQuestionMandatory: false,
    checkedOptionList: [],
    subjectiveQuestionDescription: '',
  },
  {
    id: uuidv4(),
    questionTitle: '이번 달에 가장 자주 느낀 감정은 무엇인가요?',
    questionTitlePlaceholder: '문항의 제목을 입력하세요.',
    questionType: InputSurveyQuestionType.CHOICE,
    multipleOrCheckboxOptions: [
      { id: uuidv4(), content: '성취감' },
      { id: uuidv4(), content: '즐거움' },
      { id: uuidv4(), content: '피곤함' },
      { id: uuidv4(), content: '불안감' },
      { id: uuidv4(), content: '답답함' },
      { id: uuidv4(), content: '만족감' },
      { id: uuidv4(), content: '지루함' },
    ],
    isQuestionMandatory: false,
    checkedOptionList: [],
    subjectiveQuestionDescription: '',
  },
  {
    id: uuidv4(),
    questionTitle: '이번 달에 가장 도움이 된 팀 활동이나 이벤트가 있었다면 무엇인가요?',
    questionTitlePlaceholder: '문항의 제목을 입력하세요.',
    questionType: InputSurveyQuestionType.CHOICE,
    multipleOrCheckboxOptions: [
      { id: uuidv4(), content: '정기 회의' },
      { id: uuidv4(), content: '온라인 코어 타임' },
      { id: uuidv4(), content: '친목 활동 (회식, MT 등)' },
      { id: uuidv4(), content: '위클리 스크럼' },
      { id: uuidv4(), content: '데일리 스크럼' },
      { id: uuidv4(), content: '만족감' },
      { id: uuidv4(), content: 'KPT 회고' },
    ],
    isQuestionMandatory: false,
    checkedOptionList: [],
    subjectiveQuestionDescription: '',
  },
];

export const surveyQuestionStore = create<SurveyStoreState & SurveyStoreActions>()(
  devtools(
    immer((set, get) => ({
      questions: [...presetSurveyQuestions],
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

      /**
       * 질문 목록을 초기화하고, Situation을 CREATING_SURVEY로 설정합니다.
       */
      resetQuestionsAndCreatingSurveySituation: () => {
        set({
          questions: [...presetSurveyQuestions],
          surveyComponentUsingSituation: SurveySituation.CREATING_SURVEY,
        });
      },

      // TODO: 추가되는 질문의 type를 마지막 질문으로 변경

      /**
       * 새로운 질문을 추가합니다.
       */
      addQuestion: () =>
        set((state) => ({
          questions: [...state.questions, defaultSurveyQuestion()],
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

      /**
       * questionId에 있는 optionId를 제거합니다.
       */
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

      /**
       * questionId에 해당하는 질문의 타입을 설정합니다.
       */
      setQuestionType: (questionId, questionType) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === questionId ? { ...q, questionType: questionType } : q,
          ),
        })),

      getQuestionById: (questionId) => get().questions.find((q) => q.id === questionId) || null,

      /**
       * 설문 생성 시에 사용 : 저장되어 있는 설문을 설문 생성 API Request 형식에 맞게 변환합니다.
       */
      transferQuestionsToCreateSurveyRequestFormat: () => {
        const questions: CreateSurveyQuestion[] = get().questions.map((q) => ({
          title: q.questionTitle,
          type: q.questionType,
          isMandatory: q.isQuestionMandatory,
          options: q.multipleOrCheckboxOptions.map((opt) => opt.content),
        }));

        return questions;
      },

      /**
       * API Reponse로 받은 questionList를 SurveyQuestion 형식으로 변환합니다.
       */
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

      /**
       * 사용자가 설문에 참여한 데이터를 API Request 형식에 맞게 변환합니다.
       */
      transferQuestionsToParticipateSurveyRequestFormat: () => {
        return get()
          .questions.map((q) => {
            if (q.questionType === InputSurveyQuestionType.CHOICE) {
              const trimmedChoiceList = q.checkedOptionList.map((opt) => opt.id);
              if (trimmedChoiceList.length === 0) return null;
              return {
                questionId: q.id,
                type: TeamMoodTrackerSurveyQuestionType.MULTIPLE_CHOICE,
                multipleChoiceId: trimmedChoiceList[0],
              };
            } else if (q.questionType === InputSurveyQuestionType.CHECKBOX) {
              return {
                questionId: q.id,
                type: TeamMoodTrackerSurveyQuestionType.CHECKBOX_CHOICE,
                checkboxChoiceIdList: q.checkedOptionList.map((opt) => opt.id),
              };
            } else if (q.questionType === InputSurveyQuestionType.SUBJECT) {
              // 주관식 문항에서 답변이 비어있는 경우 생략
              if (q.subjectiveQuestionDescription.trim() === '') return null;
              return {
                questionId: q.id,
                type: TeamMoodTrackerSurveyQuestionType.SUBJECTIVE,
                subjectiveAnswer: q.subjectiveQuestionDescription,
              };
            } else {
              throw new Error('FUCKED UP QUESTION TYPE');
            }
          })
          .filter((q) => q !== null) as SurveyQuestionTypeOnPost[];
      },

      /**
       * 사용자가 설문에 참여할 때, 해당 응답이 유효한지 확인합니다.
       */
      isSurveyResponseValidWhenParticipating: () => {
        return get()
          .questions.filter((q) => q.isQuestionMandatory) // 필수 문항에 대해서 검사
          .every((q) => get().isQuestionResponseValidWhenParticipating(q.id));
      },

      isQuestionResponseValidWhenParticipating: (questionId: string) => {
        const q = get().getQuestionById(questionId);
        if (!q) {
          throw new Error(`Question with ID ${questionId} does not exist.`);
        }
        if (!q.isQuestionMandatory) {
          return true; // 필수 문항이 아니면 항상 유효
        }
        // 각 문항이 유효한지 검사
        if (q.questionType === InputSurveyQuestionType.CHOICE) {
          return q.checkedOptionList.length > 0; // 객관식 문항은 선택된 옵션이 있어야 함
        } else if (q.questionType === InputSurveyQuestionType.CHECKBOX) {
          return q.checkedOptionList.length > 0; // 체크박스 문항은 하나 이상의 선택된 옵션이 있어야 함
        } else if (q.questionType === InputSurveyQuestionType.SUBJECT) {
          return q.subjectiveQuestionDescription.trim() !== ''; // 주관식 문항은 답변이 있어야 함
        }
        return false;
      },

      /**
       * 현재 list 안에 있는 모든 질문이 유효한지 검토합니다.
       */
      isCreatedSurveyValid: () => {
        return get().questions.every((q) => {
          return get().isQuestionValid(q.id);
        });
      },

      /**
       * 주어진 questionId에서, optionId에 해당하는 것과 동일한 옵션이 question 내에 존재하는지 확인합니다.
       */
      isDuplicateOptionInQuestion: (questionId: string, optionId: string) => {
        const question = get().getQuestionById(questionId);
        if (!question) {
          throw new Error(`Question with ID ${questionId} does not exist.`);
        }

        if (
          question.questionType === InputSurveyQuestionType.CHOICE ||
          question.questionType === InputSurveyQuestionType.CHECKBOX
        ) {
          const value = question.multipleOrCheckboxOptions.filter((opt) => opt.id === optionId)[0];
          if (!value.content) return false;
          // 하나라도 같으면 false를 반환
          return question.multipleOrCheckboxOptions.some(
            (option) => option.id !== value.id && option.content === value.content,
          );
        }

        return false; // 주관식 문항은 옵션이 없으므로 항상 유효
      },

      /**
       * 주어진 질문 ID에 대한 질문이 유효한지 확인합니다.
       *
       * 질문의 제목이 비어있지 않은지 & 옵션 중에 비어있는 항목이 있는지 & 옵션 중에 중복이 있는지
       */
      isQuestionValid: (questionId: string) => {
        const q = get().getQuestionById(questionId);
        if (!q) {
          throw new Error(`Question with ID ${questionId} does not exist.`);
        }

        if (
          q.questionType === InputSurveyQuestionType.CHOICE ||
          q.questionType === InputSurveyQuestionType.CHECKBOX
        ) {
          return (
            // 질문 제목이 비어 있지 않고
            get().isQuestionHasTitleAndValidOptions(questionId) &&
            // 옵션이 비어 있지 않음
            q.multipleOrCheckboxOptions.every(
              (options) => !get().isDuplicateOptionInQuestion(q.id, options.id),
            )
          ); // 다지선다형 문항은 제목과 옵션이 비어 있지 않아야 함
        } else if (q.questionType === InputSurveyQuestionType.SUBJECT) {
          return q.questionTitle.trim() !== ''; // 주관식 문항은 제목이 있어야 함
        }

        return false; // 기타 문항은 유효하지 않음
      },

      // 질문 제목이 비어 있거나 옵션이 비어 있는지 확인하는 함수
      isQuestionHasTitleAndValidOptions: (questionId: string) => {
        const q = get().getQuestionById(questionId);
        if (!q) {
          throw new Error(`Question with ID ${questionId} does not exist.`);
        }

        if (
          q.questionType === InputSurveyQuestionType.CHOICE ||
          q.questionType === InputSurveyQuestionType.CHECKBOX
        ) {
          return (
            q.questionTitle.trim() !== '' &&
            q.multipleOrCheckboxOptions.length > 0 &&
            q.multipleOrCheckboxOptions.every((options) => options.content !== '')
          ); // 다지선다형 문항은 제목과 옵션이 비어 있지 있어야 함
        } else if (q.questionType === InputSurveyQuestionType.SUBJECT) {
          return q.questionTitle.trim() !== ''; // 주관식 문항은 제목이 있어야 함
        }

        return false; // 기타 문항은 유효하지 않음
      },
    })),
    { name: 'SurveyQuestionStore' },
  ),
);
