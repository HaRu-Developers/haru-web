'use client';

import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { TextCtaConfig, TextCtaProps, TextCtaType } from './TextCta.types';

const textCtaConfig: Record<TextCtaType, TextCtaConfig> = {
  [TextCtaType.AI_MEETING_MANAGER]: {
    iconState: PlusIconsState.SIZE_20_PRIMARY,
    color: 'text-primary',
  },
  [TextCtaType.SNS_EVENT_ASSISTANT]: {
    iconState: PlusIconsState.SIZE_20_SECONDARY_GREEN,
    color: 'text-secondary-green',
  },
  [TextCtaType.TEAM_MOOD_TRACKER]: {
    iconState: PlusIconsState.SIZE_20_SECONDARY_BLUE,
    color: 'text-secondary-blue',
  },
};

const TextCta = ({ type, onClick }: TextCtaProps) => {
  const { iconState, color } = textCtaConfig[type];

  return (
    <div
      className="border-stroke-100 flex h-48 w-61 cursor-pointer flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed bg-white hover:bg-gray-600"
      onClick={onClick}
    >
      <PlusIcons state={iconState} />
      <span className={`text-bt2-sb mt-1.5 ${color}`}>Create New</span>
    </div>
  );
};

export default TextCta;
