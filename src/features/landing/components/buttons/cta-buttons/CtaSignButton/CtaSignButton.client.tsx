'use client';

import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * CTA 로그인 회원가입 버튼 컴포넌트
 */
const CtaSignButton = ({ className, onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'rounded-7pxr h-38pxr w-128pxr py-12pxr bg-primary flex items-center justify-center',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <span className="text-bt1-sb text-white">로그인 / 회원가입</span>
    </button>
  );
};

export default CtaSignButton;
