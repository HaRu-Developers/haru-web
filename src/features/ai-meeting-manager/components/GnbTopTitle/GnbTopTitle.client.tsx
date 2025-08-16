'use client';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import { GnbTopTitleProps } from './GnbTopTitle.types';

const GnbTopTitle = ({ meetingId }: GnbTopTitleProps) => {
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);

  // SSR로 받은 ssrTitle을 초기 fallback으로 쓰고,
  // 클라에서 같은 queryKey를 구독해서 이후 갱신을 반영함
  // const title = meetingMinutesDetail?.title ?? ssrTitle ?? '';

  return (
    <GnbTop
      section={GnbSection.CUSTOM}
      title={meetingMinutesDetail?.title}
      isLoading={isFetching}
    />
  );
};

export default GnbTopTitle;
