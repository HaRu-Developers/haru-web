'use client';

import CalendarIcon from '@svgs/component-set/CalendarIcon.svg';
import EventsIcon from '@svgs/component-set/EventsIcon.svg';
import MeetingsIcon from '@svgs/component-set/MeetingsIcon.svg';
import MoodTrackerIcon from '@svgs/component-set/MoodTrackerIcon.svg';
import WorkSpaceOnBoardingImage from '@svgs/component-set/WorkSpaceOnBoardingImage.svg';

import FeatureCard from './FeatureCard/FeatureCard';
import { Feature, Position } from './WorkSpaceOnBoarding.types';

const features: Feature[] = [
  {
    title: 'Meetings',
    description: 'HaRu와 함께 회의를 진행\n하고, 실시간 질문 추천과\n 회의록까지 받아보세요.',
    icon: MeetingsIcon,
    position: Position.topLeft,
  },
  {
    title: 'Events',
    description: 'SNS 이벤트를 등록하고\n 참여자 수집과 추첨까지\n 한 번에 진행하세요.',
    icon: EventsIcon,
    position: Position.topRight,
  },
  {
    title: 'Mood Tracker',
    description: '간단한 설문을 통해\n 팀의 분위기를 한눈에\n 파악해 보세요.',
    icon: MoodTrackerIcon,
    position: Position.bottomLeft,
  },
  {
    title: 'Calendar',
    description: '우리 팀 일정을 한눈에\n 확인하고, 중요한 일정도\n 손쉽게 관리해 보세요.',
    icon: CalendarIcon,
    position: Position.bottomRight,
  },
] as const;

const positionClass: Record<Position, string> = {
  [Position.topLeft]: 'absolute -top-50 -left-32',
  [Position.topRight]: 'absolute -top-42 -right-30',
  [Position.bottomLeft]: 'absolute -bottom-38 -left-30',
  [Position.bottomRight]: 'absolute -bottom-45 -right-16',
};

const WorkSpaceOnBoarding = () => {
  return (
    <section className="flex h-screen w-[50vw] items-center justify-center bg-gray-700">
      <div className="relative">
        <WorkSpaceOnBoardingImage />

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
