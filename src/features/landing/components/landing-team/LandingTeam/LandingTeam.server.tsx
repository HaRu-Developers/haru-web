import clsx from 'clsx';

import TitleSection from '../../TitleSection/TitleSection.server';
import TeamLayout from '../TeamLayout/TeamLayout.server';
import { LandingTeamProps } from './LandingTeam.types';

/*
 * 랜딩의 팀 HaRu를 소개합니다! 페이지
 */
const LandingTeam = ({ className }: LandingTeamProps) => {
  return (
    <div
      className={clsx(
        'bg-landing-bg gap-y-54pxr pt-103pxr pb-130pxr flex w-full flex-col items-center justify-center',
        className,
      )}
    >
      <TitleSection
        title1="팀"
        title2="HaRu"
        title3="를 소개합니다!"
        description="당신의 하루를 위해, 팀 HaRu가 모였습니다."
        className="items-center"
      />
      <div className="gap-21pxr grid grid-cols-3">
        <TeamLayout
          name="황지원"
          position="PM"
          description="중앙대학교 경영 주전공, 소프트웨어벤처 융합 전공"
        />
        <TeamLayout
          name="이수호"
          position="Designer"
          description="한양대학교 ERICA ICT학부 디자인테크놀로지 전공"
        />
        <TeamLayout
          name="김여진"
          position="Frontend Developer"
          description="숭실대학교 IT대학 글로벌미디어 전공"
        />
        <TeamLayout
          name="손기훈"
          position="Frontend Developer"
          description="숭실대학교 IT대학 글로벌미디어 전공"
        />
        <TeamLayout
          name="박경운"
          position="Frontend Developer"
          description="중앙대학교 소프트웨어 전공"
        />
        <TeamLayout
          name="박수현"
          position="Frontend Developer"
          description="명지대학교 컴퓨터공학 전공"
        />
        <TeamLayout
          name="임동재"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
        />
        <TeamLayout
          name="김진호"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
        />
        <TeamLayout
          name="이석주"
          position="Backend Developer"
          description="중앙대학교 소프트웨어 전공"
        />
        <TeamLayout
          name="이호근"
          position="Backend Developer"
          description="숭실대학교 컴퓨터 전공"
        />
      </div>
    </div>
  );
};

export default LandingTeam;
