import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import AiQuestionIcon from '@svgs/ai-question/AiQuestionIcon.svg';
import HoverAiQuestionIcon from '@svgs/ai-question/HoverAiQuestionIcon.svg';

import { AiQuestionIconsState } from './AiQuestionIcons.types';

const AiQuestionIcons = ({ state, className }: IconsCommonProps<AiQuestionIconsState>) => {
  switch (state) {
    case AiQuestionIconsState.SIZE_18:
      return <AiQuestionIcon className={clsx('h-[18px] w-[18px] shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_20:
      return <AiQuestionIcon className={clsx('h-[20px] w-[20px] shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_20_HOVER:
      return <HoverAiQuestionIcon className={clsx('h-[20px] w-[20px] shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_24_HOVER:
      return <HoverAiQuestionIcon className={clsx('h-[24px] w-[24px] shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_24:
      return <AiQuestionIcon className={clsx('h-[24px] w-[24px] shrink-0', className)} />;
    default:
      return null;
  }
};

export default AiQuestionIcons;
