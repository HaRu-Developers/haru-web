import { ButtonsCommonProps } from '../../types/buttons.common.types';

export interface NextStepButtonProps extends ButtonsCommonProps {
  loading?: boolean; // 로딩 상태
  loadingText?: string; // 로딩 상태에 쓸 텍스트
}
