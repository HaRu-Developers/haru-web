import CreateAiMeetingIcon from '@svgs/component-set/CreateAiManagerIcon.svg';
import CreateSnsEventAssistentIcon from '@svgs/component-set/CreateSnsEventAssistentIcon.svg';
import CreateTeamMoodTrackerIcon from '@svgs/component-set/CreateTeamMoodTrackerIcon.svg';
import PlusIcon from '@svgs/component-set/PlusIcon.svg';

import { ImageCtaConfig, ImageCtaProps, ImageCtaType } from './ImageCta.types';

const imageCtaConfig: Record<ImageCtaType, ImageCtaConfig> = {
  [ImageCtaType.AI_MEETING]: {
    color: 'text-primary',
    title: 'AI 회의 진행 매니저',
    icon: CreateAiMeetingIcon,
    iconWidth: '91px',
    iconHeight: '96px',
    marginBottom: 'mb-[20.5px]',
  },
  [ImageCtaType.SNS_EVENT]: {
    color: 'text-secondary-green',
    title: 'SNS 이벤트 어시스턴트',
    icon: CreateSnsEventAssistentIcon,
    iconWidth: '132px',
    iconHeight: '97px',
    marginBottom: 'mb-[20.5px]',
  },
  [ImageCtaType.TEAM_TRACKER]: {
    color: 'text-secondary-blue',
    title: '팀 분위기 트래커',
    icon: CreateTeamMoodTrackerIcon,
    iconWidth: '113px',
    iconHeight: '107px',
    marginBottom: 'mb-[14.5px]',
  },
};

const ImageCta = ({ type, onClick }: ImageCtaProps) => {
  const config = imageCtaConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className="border-stroke-100 flex h-56 w-82.5 flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed bg-white py-[27px] text-center hover:bg-gray-600"
      onClick={onClick}
    >
      <h3 className="text-t4-bd mb-[10.5px] text-black">{config.title}</h3>

      <div className={`flex items-center gap-[0.5px] ${config.color} ${config.marginBottom}`}>
        <PlusIcon width="16px" height="16px" className={config.color} />
        <span className="text-bt1-sb">Create New</span>
      </div>

      <IconComponent width={config.iconWidth} height={config.iconHeight} />
    </div>
  );
};

export default ImageCta;
