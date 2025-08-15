export enum SurveyVisibility {
  // 벡엔드와 동일
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum InputSurveyQuestionType {
  // 벡엔드와 동일
  CHOICE = 'MULTIPLE_CHOICE', // 객관식 질문 - 라디오 형태 1개만 선택 가능
  CHECKBOX = 'CHECKBOX_CHOICE', // 체크 박스 - 복수 선택 가능
  SUBJECT = 'SUBJECTIVE', // 주관식 질문 - 긴 문장 textarea 사용하기
}
