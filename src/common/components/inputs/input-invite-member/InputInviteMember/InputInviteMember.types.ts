export interface InputInviteMemberProps {
  title: string; // 제목 ex) 새로운 팀원 추가하기
  value?: string; // 입력값, 이메일 주소
  emails?: string[]; // 이메일 목록, 초대할 팀원들의 이메일 주소들
  placeholder?: string; // placeholder ex) 초대할 팀원의 이메일 주소를 입력해 주세요.
  onValueChange?: (value: string) => void; // 입력값 변경 시 호출되는 함수
  onEmailsChange?: (emails: string[]) => void; // 이메일 목록 변경 시 호출되는 함수
  onInvite?: (emails: string[]) => void; // 초대 버튼 클릭 시 이메일 목록 반환 및 기존 이메일 제거
  onRemove?: (email: string) => void; // 삭제된 이메일 반환
  className?: string; // 추가적인 클래스 이름
}
