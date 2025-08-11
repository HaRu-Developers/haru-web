'use client';

import { useIsFetching } from '@tanstack/react-query';

import { GnbSection } from '@common/types/gnbs.types';

import queryKeys from '@common/constants/query-key.constants';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import { GnbTopTitleProps } from './GnbTopTitle.types';

const GnbTopTitle = ({ meetingId, title }: GnbTopTitleProps) => {
  // 전역 React Query 캐시에서, 이 queryKey가 "가져오는 중"인 쿼리의 개수를 반환
  const isFetching =
    useIsFetching({ queryKey: queryKeys.meetings.meetingMinutesDetail(meetingId).queryKey }) > 0;

  return <GnbTop section={GnbSection.CUSTOM} title={title} isLoading={isFetching} />;
};

export default GnbTopTitle;
