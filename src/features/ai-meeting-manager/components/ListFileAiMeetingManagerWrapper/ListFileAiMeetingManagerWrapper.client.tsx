'use client';

import useFetchMeetingMinutesList from '@api/meeting/get/queries/useFetchMeetingMinutesList';

import ListFileAiMeetingManager from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManager.client';
import ListFileAiMeetingManagerSkeleton from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManagerSkeleton.server';

import {
  useListActions,
  useListInfo,
} from '@features/ai-meeting-manager/hooks/stores/useListStore';

import { ListFileAiMeetingManagerWrapperProps } from './ListFileAiMeetingManagerWrapper.types';

const ListFileAiMeetingManagerWrapper = ({ workspaceId }: ListFileAiMeetingManagerWrapperProps) => {
  const { isFetching, extra: meetingMinutesList } = useFetchMeetingMinutesList(workspaceId);
  const { isAnyChecked, checkedIds } = useListInfo();
  const { toggleChecked } = useListActions();

  const hasMeetingMinutes = (meetingMinutesList?.length ?? 0) > 0;

  return (
    <>
      {hasMeetingMinutes && isFetching && <ListFileAiMeetingManagerSkeleton />}

      {/* 로딩 끝났는데도 데이터 없으면 빈 상태 */}
      {!hasMeetingMinutes && !isFetching && (
        <p className="p-8pxr text-t4-md text-gray-400">회의록이 없습니다.</p>
      )}

      {/* 데이터가 있으면 목록 표시 */}
      {hasMeetingMinutes &&
        meetingMinutesList?.map((m) => (
          <ListFileAiMeetingManager
            key={m.meetingId}
            workspaceId={workspaceId}
            meetingId={m.meetingId}
            title={m.title}
            updatedAt={m.updatedAt}
            isCheckMode={isAnyChecked}
            isChecked={checkedIds.has(m.meetingId)}
            onCheckToggle={toggleChecked}
          />
        ))}
    </>
  );
};

export default ListFileAiMeetingManagerWrapper;
