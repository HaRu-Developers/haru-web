'use client';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import { ImageSize } from '@common/components/images/types/images.common.types';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';

import MeetingHEaderSkeleton from './MeetingHeaderSkeleton.client';

const MeetingHeader = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);

  const title = meetingMinutesDetail?.title?.trim() || '제목 없음';
  const userId = meetingMinutesDetail?.userId ?? '';
  const userName = meetingMinutesDetail?.userName ?? '작성자 없음';
  const updatedAt = meetingMinutesDetail?.updatedAt ?? '';

  return (
    <h2 className="pt-24pxr px-32pxr gap-y-16pxr flex h-[var(--meeting-header-height)] w-full flex-col">
      {/* 제목 */}
      <InputFileTitle isLoading={isFetching} value={title} noPadding />
      <FileCreatedInfo
        isLoading={isFetching}
        name={userName}
        userId={userId}
        dateTime={updatedAt}
        profileSize={ImageSize.XSMALL}
      />
    </h2>
  );
};

export default MeetingHeader;
