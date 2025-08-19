'use client';

// SendLinkToTeamByEmailButton
import clsx from 'clsx';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '팀원에게 이메일로 링크 전송하기' 버튼
 */
const SendLinkToTeamByEmailButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-bt1-sb border-stroke-200 h-38pxr w-320pxr rounded-7pxr px-16pxr py-12pxr inline-flex items-center justify-center border bg-white text-gray-100 hover:bg-gray-600',
      )}
      onClick={onClick}
      {...props}
    >
      팀원에게 이메일로 링크 전송하기
    </button>
  );
};

export default SendLinkToTeamByEmailButton;
