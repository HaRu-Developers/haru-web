'use client';

import CtaIcons from '@icons/Cta/CtaIcons';
import { CtaIconsState } from '@icons/Cta/CtaIcons.types';
import PlusIcons from '@icons/PlusIcons/PlusIcons';
import { PlusIconsState } from '@icons/PlusIcons/PlusIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { ImageCtaConfig, ImageCtaProps } from './ImageCta.types';

const imageCtaConfig: Record<FileType, ImageCtaConfig> = {
  [FileType.AI_MEETING_MANAGER]: {
    title: 'AI 회의 진행 매니저',
    color: 'text-primary',
    ctaIconState: CtaIconsState.AI_MEETING_MANAGER,
    plusIconState: PlusIconsState.SIZE_16_PRIMARY,
    marginBottom: 'mb-20pxr',
  },
  [FileType.SNS_EVENT_ASSISTANT]: {
    title: 'SNS 이벤트 어시스턴트',
    color: 'text-secondary-green',
    ctaIconState: CtaIconsState.SNS_EVENT_ASSISTANT,
    plusIconState: PlusIconsState.SIZE_16_SECONDARY_GREEN,
    marginBottom: 'mb-20pxr',
  },
  [FileType.TEAM_MOOD_TRACKER]: {
    title: '팀 분위기 트래커',
    color: 'text-secondary-blue',
    ctaIconState: CtaIconsState.TEAM_MOOD_TRACKER,
    plusIconState: PlusIconsState.SIZE_16_SECONDARY_BLUE,
    marginBottom: 'mb-14pxr',
  },
};

const ImageCta = ({ type, onClick }: ImageCtaProps) => {
  const config = imageCtaConfig[type];

  return (
    <div
      className="border-stroke-100 py-28pxr flex h-56 w-82.5 cursor-pointer flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed bg-white text-center hover:bg-gray-600"
      onClick={onClick}
    >
      <h3 className="text-t4-bd mb-10pxr text-black">{config.title}</h3>

      <div className={`gap-2pxr flex items-center ${config.color} ${config.marginBottom}`}>
        <PlusIcons state={config.plusIconState} />
        <span className="text-bt1-sb">Create New</span>
      </div>

      <CtaIcons state={config.ctaIconState} />
    </div>
  );
};

export default ImageCta;
