export enum Visibility {
  // 벡엔드와 동일
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum Type {
  // 벡엔드와 동일
  CHOICE = 'CHOICE', // 객관식 질문 - 라디오 형태 1개만 선택 가능
  CHECKBOX = 'CHECKBOX', // 체크 박스 - 복수 선택 가능
  SUBJECT = 'SUBJECT', // 주관식 질문 - 긴 문장 textarea 사용하기
}
