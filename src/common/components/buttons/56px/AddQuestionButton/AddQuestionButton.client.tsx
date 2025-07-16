'use client';

import clsx from 'clsx';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { ButtonsCommonProps } from '../../types/buttons.common.types';

/**
 * '다음 단계로' 버튼
 */
const AddQuestionButton = ({ onClick, ...props }: ButtonsCommonProps) => {
  return (
    <button
      className={clsx(
        'text-button-1 inline-flex h-[56px] w-[668px] items-center justify-center gap-x-[4px] rounded-[12px] bg-gray-600 px-[218px] py-[37px] text-gray-400',
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
