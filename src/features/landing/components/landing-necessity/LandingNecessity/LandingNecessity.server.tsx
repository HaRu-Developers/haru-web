import clsx from 'clsx';

import { LandingNecessityIconsState } from '@icons/LandingNecessityIcons/LandingNecessityIcons.types';

import TitleSection from '../../TitleSection/TitleSection.server';
import SectionLayout from '../SectionLayout/SectionLayout.server';
import { LandingNecessityProps } from './LandingNecessity.types';

/*
 * 랜딩 페이지의 HaRu가 왜 필요한가요? 부분
 */
const LandingNecessity = ({ className }: LandingNecessityProps) => {
  return (
    <div
      className={clsx('py-130pxr gap-109pxr bg-landing-bg flex w-full justify-between', className)}
    >
      <TitleSection
        title2="HaRu"
        title3="가 왜 필요한가요?"
        description="HaRu는 모든 팀이 더 가치 있는 순간에 집중할 수 있도록 돕습니다."
      />
      <div className="gap-58pxr flex flex-col">
        <SectionLayout
          state={LandingNecessityIconsState.GRAPH}
          title="운영자 수작업 부담 감소"
          description={
            '기존에 수작업으로 이루어지던 작업을 자동화하여 운영자의 부담을 획기적으로 줄여줍니다.\n 또한, 팀의 운영에 필요한 작업들을 신속하게 처리하여 전체 업무 진행 속도를 높여줍니다.'
          }
        />
        <SectionLayout
          state={LandingNecessityIconsState.GEAR}
          title="휴먼 에러 예방"
          description="중복 기록, 입력 오류, 누락 등으로 인해 발생하는 문제를 방지해 줍니다."
        />
        <SectionLayout
          state={LandingNecessityIconsState.TALK}
          title="팀 내 분위기 향상"
          description={
            '팀원들의 말 하지 못했던 속마음까지도 파악하여\n팀 내 정서적 유대감을 강화하고 더 따뜻한 팀 분위기를 조성해 줍니다.'
          }
        />
        <SectionLayout
          state={LandingNecessityIconsState.DISPLAY}
          title="공정하고 투명한 운영"
          description="신뢰할 수 있는 AI 기술을 바탕으로, 공정하고 투명한 운영을 가능하게 합니다."
        />
      </div>
    </div>
  );
};

export default LandingNecessity;
