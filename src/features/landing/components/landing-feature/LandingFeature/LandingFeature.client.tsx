'use client';

import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { FileType } from '@common/types/file-type.enum';

import TitleSection from '../../TitleSection/TitleSection.client';
import FeatureImage from '../feature/FeatureImage/FeatureImage.server';
import FeatureText from '../feature/FeatureText/FeatureText.client';
import { LandingFeatureProps } from './LandingFeature.types';

const LandingFeature = ({ className, onClick }: LandingFeatureProps) => {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: aiRef, inView: aiInView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const { ref: snsRef, inView: snsInView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div
      className={clsx(
        'bg-landing-bg py-130pxr gap-y-80pxr px-120pxr flex w-full flex-col',
        className,
      )}
    >
      <TitleSection
        ref={titleRef}
        inView={titleInView}
        title1="당신의 하루를 위한 서비스,"
        title2="HaRu"
        title3="의 핵심 기능을 만나 보세요!"
        isSpacing={true}
        className={clsx('h-141pxr', {
          'animate-fade-in-up-and-delay': titleInView,
        })}
      />

      <div className="flex w-full flex-col">
        {/* AI 회의 진행 매니저 */}
        <div
          ref={aiRef}
          className={clsx('mb-82pxr gap-x-43pxr flex w-full opacity-0', {
            'animate-fade-in-up-and-delay': aiInView,
          })}
        >
          <FeatureImage fileType={FileType.AI_MEETING_MANAGER} />
          <FeatureText fileType={FileType.AI_MEETING_MANAGER} onClick={onClick} />
        </div>

        {/* SNS 이벤트 어시스턴스 */}
        <div
          ref={snsRef}
          className={clsx('mb-86pxr gap-x-43pxr flex w-full justify-end opacity-0', {
            'animate-fade-in-up-and-delay': snsInView,
          })}
        >
          <FeatureText fileType={FileType.SNS_EVENT_ASSISTANT} isFlip={true} onClick={onClick} />
          <FeatureImage fileType={FileType.SNS_EVENT_ASSISTANT} />
        </div>

        {/* 팀 분위기 트래커 */}
        <div
          ref={teamRef}
          className={clsx('gap-x-54pxr flex w-full opacity-0', {
            'animate-fade-in-up-and-delay': teamInView,
          })}
        >
          <FeatureImage fileType={FileType.TEAM_MOOD_TRACKER} />
          <FeatureText fileType={FileType.TEAM_MOOD_TRACKER} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default LandingFeature;
