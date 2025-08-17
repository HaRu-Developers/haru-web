'use client';

import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import TitleSection from '../../TitleSection/TitleSection.client';
import TeamLayout from '../TeamLayout/TeamLayout.server';
import { LandingTeamProps } from './LandingTeam.types';

/*
 * 랜딩의 팀 HaRu를 소개합니다! 페이지
 */
const LandingTeam = ({ className }: LandingTeamProps) => {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: descriptionRef, inView: descriptionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div
      className={clsx(
        'bg-landing-bg gap-y-54pxr pt-103pxr pb-130pxr border-stroke-200 flex w-full flex-col items-center justify-center border-t border-b',
        className,
      )}
    >
      <TitleSection
        ref={titleRef}
        inView={titleInView}
        title1="팀"
        title2="HaRu"
        title3="를 소개합니다!"
        description="당신의 하루를 위해, 팀 HaRu가 모였습니다."
        className="h-104pxr items-center"
      />
      <div className="gap-21pxr grid grid-cols-3" ref={descriptionRef}>
        <TeamLayout
          name="황지원"
          position="PM"
          description="중앙대학교 경영 주전공, 소프트웨어벤처 융합 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay': descriptionInView,
          })}
        />
        <TeamLayout
          name="이수호"
          position="Designer"
          description="한양대학교 ERICA ICT학부 디자인테크놀로지 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-100': descriptionInView,
          })}
        />
        <TeamLayout
          name="김여진"
          position="Frontend Developer"
          description="숭실대학교 IT대학 글로벌미디어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-200': descriptionInView,
          })}
        />
        <TeamLayout
          name="손기훈"
          position="Frontend Developer"
          description="숭실대학교 IT대학 글로벌미디어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-300': descriptionInView,
          })}
        />
        <TeamLayout
          name="박경운"
          position="Frontend Developer"
          description="중앙대학교 소프트웨어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-400': descriptionInView,
          })}
        />
        <TeamLayout
          name="박수현"
          position="Frontend Developer"
          description="명지대학교 컴퓨터공학 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-500': descriptionInView,
          })}
        />
        <TeamLayout
          name="임동재"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-600': descriptionInView,
          })}
        />
        <TeamLayout
          name="김진호"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-700': descriptionInView,
          })}
        />
        <TeamLayout
          name="이석주"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-800': descriptionInView,
          })}
        />
        <TeamLayout
          name="이호근"
          position="Backend Developer"
          description="숭실대학교 컴퓨터 전공"
          className={clsx('opacity-0', {
            'animate-fade-in-up-and-delay animate-delay-900': descriptionInView,
          })}
        />
      </div>
    </div>
  );
};

export default LandingTeam;
