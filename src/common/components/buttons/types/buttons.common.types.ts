import { ButtonHTMLAttributes } from 'react';

// 아래 주석을 지우게 될 경우 eslint 오류가 발생하니 주의 바랍니다.
// buttonType 필드를 추가했습니다. 오류는 안 날 예정 !

export interface ButtonsCommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: string; // 버튼의 타입을 지정하는 속성
}

// 나중에 button 내에 공통되는 요소가 많아질 경우 사용해주세요.
// 각 button component의 types 파일에서 extend해서 사용하는 방식.
