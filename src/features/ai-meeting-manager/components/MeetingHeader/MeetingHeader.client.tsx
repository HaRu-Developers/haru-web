'use client';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';

const MeetingHeader = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);

  const title = meetingMinutesDetail?.title ?? '';
  const userId = meetingMinutesDetail?.userId ?? '';
  const userName = meetingMinutesDetail?.userName ?? '';
  const updatedAt = meetingMinutesDetail?.updatedAt ?? '';

  return (
    <h2 className="px-32pxr py-24pxr gap-y-16pxr flex w-full flex-col">
      {/* 제목 */}
      {isFetching ? (
        <div className="w-250pxr h-36pxr animate-bg-pulse rounded-4pxr" />
      ) : (
        <h3 className="text-t1-sb text-black">{title}</h3>
      )}
      <FileCreatedInfo
        isLoading={isFetching}
        name={userName}
        userId={userId}
        dateTime={updatedAt}
      />
    </h2>
  );
};

export default MeetingHeader;
