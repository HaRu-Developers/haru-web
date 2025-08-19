'use client';

import clsx from 'clsx';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '다음 단계로' 버튼
 */
const AddQuestionButton = ({ onClick, className, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 h-56pxr w-668pxr gap-x-4pxr rounded-12pxr px-218pxr py-37pxr inline-flex items-center justify-center bg-gray-600 text-gray-400',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <PlusIcons state={PlusIconsState.SIZE_20_GRAY_400} />
      <p>문항 추가하기</p>
    </button>
  );
};

export default AddQuestionButton;
