'use client';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { TextCtaConfig, TextCtaProps } from './TextCta.types';

const textCtaConfig: Record<FileType, TextCtaConfig> = {
  [FileType.AI_MEETING_MANAGER]: {
    iconState: PlusIconsState.SIZE_20_PRIMARY,
    color: 'text-primary',
  },
  [FileType.SNS_EVENT_ASSISTANT]: {
    iconState: PlusIconsState.SIZE_20_SECONDARY_GREEN,
    color: 'text-secondary-green',
  },
  [FileType.TEAM_MOOD_TRACKER]: {
    iconState: PlusIconsState.SIZE_20_SECONDARY_BLUE,
    color: 'text-secondary-blue',
  },
};

const TextCta = ({ type, onClick, disabled = false }: TextCtaProps) => {
  const { iconState, color } = textCtaConfig[type];

  return (
    <button
      aria-label={'Create New'}
      className="border-stroke-100 flex h-48 w-61 flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed bg-white hover:bg-gray-600"
      onClick={onClick}
      disabled={disabled}
    >
      <PlusIcons state={iconState} />
      <span className={`text-bt2-sb mt-1.5 ${color}`}>Create New</span>
    </button>
  );
};

export default TextCta;
