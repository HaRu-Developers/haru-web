'use client';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import { ButtonsCommonProps } from '@buttons/types/buttons.common.types';

const OptionDeleteButton = ({ onClick, className }: ButtonsCommonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <CrossIcons state={CrossIconsState.SIZE_16_GRAY_200} />
    </button>
  );
};

export default OptionDeleteButton;
