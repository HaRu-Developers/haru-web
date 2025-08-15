import { TermsType } from './TermsModal.types';

// TODO: 서버에서 title 안 주면 사용, 아니면 없애기
export const termsTitle = {
  [TermsType.SERVICE]: '서비스이용약관',
  [TermsType.PRIVACY]: '개인정보처리방침',
  [TermsType.MARKETING]: '마케팅정보수신',
};
