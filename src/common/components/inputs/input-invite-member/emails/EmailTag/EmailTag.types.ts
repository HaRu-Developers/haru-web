export interface EmailTagProps {
  value?: string;
  onClick?: (email: string) => void; // 밑에 입력된 이메일 값 호출 용도 -> 이메일 자동 완성 기능 생성 할 수도 있음
}
