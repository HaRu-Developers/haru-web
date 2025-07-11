import { Suspense } from 'react';

import { SearchParamsType } from '@common/types/routing.types';

import { GnbSection, SnsGnbTabType } from '@common/constants/gnbs';

import GnbLeft from '@common/components/gnbs/GnbLeft/GnbLeft.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

const TestPage = async ({ searchParams }: { searchParams: Promise<SearchParamsType> }) => {
  const { snsGnbTab } = await searchParams;
  const formattedSnsGnbTab =
    typeof snsGnbTab === 'string' &&
    Object.values(SnsGnbTabType).includes(snsGnbTab as SnsGnbTabType)
      ? (snsGnbTab as SnsGnbTabType)
      : SnsGnbTabType.ALL_EVENTS; // 기본값

  return (
    <>
      <Suspense fallback={<div>탭 로딩 중...</div>}>
        {/* <GnbTop section={GnbSection.MAIN} /> */}
        {/* <GnbTop section={GnbSection.AI_MEETING_MANAGER} /> */}
        {/* <GnbTop section={GnbSection.TEAM_MOOD_TRACKER} /> */}
        {/* <GnbTop section={GnbSection.CALENDAR} /> */}
        {/* <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} current={formattedSnsGnbTab} /> */}
        <GnbTop
          section={GnbSection.CUSTOM}
          title="UMC 8기 운영진 회의"
          current={formattedSnsGnbTab}
        />
      </Suspense>
      {/* <GnbLeft /> */}
      <Suspense fallback={<div>패널 로딩 중...</div>}>
        {/* TODO: 여기에 패널 컴포넌트 넣기 (formattedSnsGnbTab을 props으로 전달해 사용) */}
      </Suspense>
    </>
  );
};

export default TestPage;
