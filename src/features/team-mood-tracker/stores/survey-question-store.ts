import { InputSurveyQuestionHandlers } from '@common/components/inputs/input-survey/InputSurvey/InputSurvey.types';
import {
  InputSurveyQuestionType,
  SurveySituation,
} from '@common/components/inputs/input-survey/types/input-survey.common.types';

interface SurveyQuestion {
  // 질문의 제목입니다.
  questionTitle: string;
  // 질문 제목이 입력되기 전 상태일 때의 placeholder 입니다.
  questionTitlePlaceholder?: string;
  // 컴포넌트 사용 상황에 따른 구분입니다. 자세한건 SurveySituation를 참고하세요.
  surveyComponentUsingSituation?: SurveySituation;
  // 질문 유형입니다.
  questionType: InputSurveyQuestionType;
  /**
   * 객관식 또는 체크박스 질문의 선택지 목록입니다.
   *
   * 질문 목록을 받는 경우에는 id값도 포함되어 있으니 데이터 처리에 유의하여야 합니다.
   */
  multipleOrCheckboxOptions: string[];
  // 필수적인지 아닌지
  isQuestionMandatory?: boolean;
  // 주관식 문항에 대한 내용
  subjectiveQuestionDescription?: string;
  // 이벤트 핸들러 모음
  handlers?: InputSurveyQuestionHandlers;
  // @deprecated - 기타 옵션이 있는지 여부, BE 미구현으로 주석 처리합니다.
  // isQuestionHaveEtcChoice?: boolean;
}

interface SurveyQuestionStoreState {
  questionList: SurveyQuestion[];
}

// const surveyQuestionStore
