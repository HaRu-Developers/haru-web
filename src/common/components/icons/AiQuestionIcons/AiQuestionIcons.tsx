import clsx from 'clsx';

import { IconsCommonProps } from '@icons/types/icons.common.types';

import AiQuestionIcon from '@svgs/ai-question/AiQuestionIcon.svg';
import HoverAiQuestionIcon from '@svgs/ai-question/HoverAiQuestionIcon.svg';

import { AiQuestionIconsState } from './AiQuestionIcons.types';

const AiQuestionIcons = ({ state, className }: IconsCommonProps<AiQuestionIconsState>) => {
  switch (state) {
    case AiQuestionIconsState.SIZE_18:
      return <AiQuestionIcon className={clsx('h-18pxr w-18pxr shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_20:
      return <AiQuestionIcon className={clsx('h-20pxr w-20pxr shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_20_HOVER:
      return <HoverAiQuestionIcon className={clsx('h-20pxr w-20pxr shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_24_HOVER:
      return <HoverAiQuestionIcon className={clsx('h-24pxr w-24pxr shrink-0', className)} />;
    case AiQuestionIconsState.SIZE_24:
      return <AiQuestionIcon className={clsx('h-24pxr w-24pxr shrink-0', className)} />;
    default:
      return null;
  }
};

export default AiQuestionIcons;
