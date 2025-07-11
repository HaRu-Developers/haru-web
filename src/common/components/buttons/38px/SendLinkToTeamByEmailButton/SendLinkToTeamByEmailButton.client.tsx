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
        'text-bt1-sb border-stroke-200 inline-flex h-[38px] w-[320px] items-center justify-center rounded-[7px] border bg-white px-[16px] py-[12px] text-gray-100 hover:bg-gray-600',
      )}
      onClick={onClick}
      {...props}
    >
      팀원에게 이메일로 링크 전송하기
    </button>
  );
};

export default SendLinkToTeamByEmailButton;
