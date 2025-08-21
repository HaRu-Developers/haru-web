/**
 * InputSurveyQuestion 컴포넌트가 어떤 상황에 쓰이는지를 구분해줍니다.
 *
 * PUBLIC : 문항 조회 및 설문 참여 시
 *
 * PRIVATE : 질문 생성 시
 */
export enum SurveySituation {
  // 문항 조회 및 설문 참여 시
  PARTICIPATING_SURVEY = 'PARTICIPATING_SURVEY',
  // 질문 생성 시
  CREATING_SURVEY = 'CREATING_SURVEY',
  // 질문 조회 시
  VIEW_SURVEY_QUESTIONS = 'VIEW_SURVEY_QUESTIONS',
}

export enum InputSurveyQuestionType {
  // 벡엔드와 동일
  CHOICE = 'MULTIPLE_CHOICE', // 객관식 질문 - 라디오 형태 1개만 선택 가능
  CHECKBOX = 'CHECKBOX_CHOICE', // 체크 박스 - 복수 선택 가능
  SUBJECT = 'SUBJECTIVE', // 주관식 질문 - 긴 문장 textarea 사용하기
}
