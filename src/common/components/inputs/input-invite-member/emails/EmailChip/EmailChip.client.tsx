'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { EmailChipProps } from './EmailChip.types';

/*
  인풋 멤버 초대 컴포넌트에서 삭제 가능한 칩
*/
const EmailChip = ({ email, onRemove }: EmailChipProps) => {
  const handleRemove = () => {
    onRemove?.(email);
  };
  return (
    <div className="text-b3-rg h-30pxr gap-3pxr rounded-7pxr px-9pxr flex items-center bg-gray-600 py-1.5 text-gray-200">
      <span>{email}</span>
      <div onClick={handleRemove}>
        <CrossIcons state={CrossIconsState.SIZE_16_GRAY_400} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default EmailChip;
