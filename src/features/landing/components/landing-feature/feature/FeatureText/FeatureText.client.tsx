import clsx from 'clsx';

import LandingFeatureIcons from '@icons/LandingFeatureIcons/LandingFeatureIcons';
import { LandingFeatureIconsState } from '@icons/LandingFeatureIcons/LandingFeatureIcons.types';

import { FileType } from '@common/types/file-type.enum';

import CtaFeatureButton from '@features/landing/components/buttons/cta-buttons/CtaFeatureButton/CtaFeatureButton.client';

import { FeatureTextProps } from './FeatureText.types';

const FeatureText = ({ fileType, isFlip, onClick }: FeatureTextProps) => {
  const featureMap = {
    [FileType.AI_MEETING_MANAGER]: {
      state: LandingFeatureIconsState.SIZE_62_MEETING,
      title: 'AI 회의 진행 매니저',
      description:
        '실시간 음성 텍스트 변환을 통해 대화의 흐름을 파악하여,\n맞춤형 회의 진행 질문을 추천하고 자동으로 회의록을 정리해 드려요.',
      name: 'AI 회의 진행 매니저 경험해 보기',
    },
    [FileType.SNS_EVENT_ASSISTANT]: {
      state: LandingFeatureIconsState.SIZE_62_EVENT,
      title: 'SNS 이벤트 어시스턴트',
      description:
        '링크 한 번만 입력하면 끝!\n이벤트 참여자 리스트 수집부터 공정한 당첨자 추첨까지,\n복잡한 이벤트 운영을 친절하게 도와드려요.',
      name: 'SNS 이벤트 어시스턴트 경험해 보기',
    },
    [FileType.TEAM_MOOD_TRACKER]: {
      state: LandingFeatureIconsState.SIZE_62_MOODTRACKER,
      title: '팀 분위기 트래커',
      description:
        '간편하게 설문지를 작성하고 우리 팀원들의 감정을 한눈에 파악해요.\n상세한 설문 결과 분석부터 운영자에게 꼭 필요한 인사이트까지 전해드려요.',
      name: '팀 분위기 트래커 경험해 보기',
    },
  };
  const feature = featureMap[fileType];

  return (
    <div
      className={clsx('w-664pxr h-435pxr gap-40pxr flex flex-col', {
        'pr-11pxr items-end text-right': isFlip,
        'pl-11pxr items-start text-left': !isFlip,
      })}
    >
      <div
        className={clsx('gap-10pxr flex flex-col', {
          'items-end': isFlip,
        })}
      >
        <LandingFeatureIcons state={feature.state} />
        <div className="gap-10pxr flex flex-col">
          <span className="text-h5-sb text-black">{feature.title}</span>
          <span className="text-t4-rg whitespace-pre-line text-gray-200">
            {feature.description}
          </span>
        </div>
      </div>
      <CtaFeatureButton name={feature.name} className="mx-11pxr" onClick={onClick} />
    </div>
  );
};

export default FeatureText;
