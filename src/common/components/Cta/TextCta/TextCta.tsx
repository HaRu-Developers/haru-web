import PlusRgIcon from '@svgs/component-set/PlusRgIcon.svg';

import { TextCtaProps, TextCtaType } from './TextCta.types';

const colorMap: Record<TextCtaType, string> = {
  [TextCtaType.AI_MEETING]: 'text-primary',
  [TextCtaType.SNS_EVENT]: 'text-secondary-green',
  [TextCtaType.TEAM_TRACKER]: 'text-secondary-blue',
};

const TextCta = ({ type, onClick }: TextCtaProps) => {
  const color = colorMap[type];

  return (
    <div
      className="border-stroke-100 flex h-48 w-61 cursor-pointer flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed bg-white hover:bg-gray-600"
      onClick={onClick}
    >
      <PlusRgIcon width="20px" height="20px" className={color} />
      <span className={`text-bt2-sb mt-1.5 ${color}`}>Create New</span>
    </div>
  );
};

export default TextCta;
