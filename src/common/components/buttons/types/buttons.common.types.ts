export interface ButtonsCommonProps {
  onClick?: () => void;
  disabled?: boolean;
}

// 나중에 button 내에 공통되는 요소가 많아질 경우 사용해주세요.
// 각 button component의 types 파일에서 extend해서 사용하는 방식.
