'use client';

import ListFileAiMeetingManager from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManager.client';

import useFetchMeetingMinutesList from '@/api/meeting/get/queries/useFetchMeetingMinutesList';

import { ListFileAiMeetingManagerWrapperProps } from './ListFileAiMeetingManagerWrapper.types';

const ListFileAiMeetingManagerWrapper = ({ workspaceId }: ListFileAiMeetingManagerWrapperProps) => {
  const { isFetching, extra: meetingMinutesList } = useFetchMeetingMinutesList(workspaceId);
  const hasMeetingMinutes = (meetingMinutesList?.length ?? 0) > 0;

  return (
    <>
      {!hasMeetingMinutes && <p className="p-8pxr text-t4-md text-gray-400">회의록이 없습니다.</p>}
      {isFetching && !hasMeetingMinutes ? (
        <div className="w-658pxr h-440pxr flex items-center justify-center">로딩 중…</div>
      ) : (
        meetingMinutesList?.map((meetingMinutes) => (
          <ListFileAiMeetingManager
            key={meetingMinutes.meetingId}
            meetingId={meetingMinutes.meetingId}
            title={meetingMinutes.title}
            updatedAt={meetingMinutes.updatedAt}
            isCheckMode={false}
            isChecked={false}
            onCheckToggle={() => {}}
          />
        ))
      )}
    </>
  );
};

export default ListFileAiMeetingManagerWrapper;
