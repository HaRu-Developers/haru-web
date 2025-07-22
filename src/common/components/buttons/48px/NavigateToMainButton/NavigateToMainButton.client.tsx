import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

interface NavigateToMainButtonProps extends ButtonsCommonProps {
  disabled: boolean;
}

/**
 * '메인 홈으로 이동' 버튼
 */
const NavigateToMainButton = ({ disabled, className }: NavigateToMainButtonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 h-48pxr w-260pxr rounded-9pxr px-12pxr py-17pxr inline-flex items-center justify-center text-white',
        disabled ? 'bg-gray-100' : 'bg-gray-500',
        className,
      )}
    >
      메인 홈으로 이동
    </button>
  );
};

export default NavigateToMainButton;
