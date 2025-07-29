import Image from 'next/image';

import { OnboardingIconsState } from '@icons/OnboardingIcons/OnboardingIcons.types';

import WorkSpaceOnBoardingImage from '@assets/images/onboarding/WorkSpaceOnBoardingImage.png';

import FeatureCard from './FeatureCard/FeatureCard.server';
import { Feature, Position } from './WorkSpaceOnBoarding.types';

const features: Feature[] = [
  {
    title: 'Meetings',
    description: 'HaRu와 함께 회의를 진행\n하고, 실시간 질문 추천과\n 회의록까지 받아보세요.',
    icon: OnboardingIconsState.MEETING,
    position: Position.TOP_LEFT,
  },
  {
    title: 'Events',
    description: 'SNS 이벤트를 등록하고\n 참여자 수집과 추첨까지\n 한 번에 진행하세요.',
    icon: OnboardingIconsState.EVENT,
    position: Position.TOP_RIGHT,
  },
  {
    title: 'Mood Tracker',
    description: '간단한 설문을 통해\n 팀의 분위기를 한눈에\n 파악해 보세요.',
    icon: OnboardingIconsState.MOOD_TRACKER,
    position: Position.BOTTOM_LEFT,
  },
  {
    title: 'Calendar',
    description: '우리 팀 일정을 한눈에\n 확인하고, 손 쉽게\n 관리해 보세요.',
    icon: OnboardingIconsState.CALENDAR,
    position: Position.BOTTOM_RIGHT,
  },
] as const;

const positionClass: Record<Position, string> = {
  [Position.TOP_LEFT]: 'absolute -top-50 -left-32',
  [Position.TOP_RIGHT]: 'absolute -top-42 -right-30',
  [Position.BOTTOM_LEFT]: 'absolute -bottom-38 -left-30',
  [Position.BOTTOM_RIGHT]: 'absolute -bottom-45 -right-16',
};

const WorkSpaceOnBoarding = () => {
  return (
    <section className="flex h-screen w-[50vw] items-center justify-center bg-gray-700">
      <div className="relative">
        <div className="w-345pxr h-350pxr">
          <Image src={WorkSpaceOnBoardingImage} alt="워크스페이스 온보딩 이미지" />
        </div>

        {features.map((feature) => (
          <div key={feature.title} className={`${positionClass[feature.position]} z-20`}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSpaceOnBoarding;
