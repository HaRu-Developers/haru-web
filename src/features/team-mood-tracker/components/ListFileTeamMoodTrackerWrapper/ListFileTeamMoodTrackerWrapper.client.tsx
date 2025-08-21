'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import notFoundImage from '@assets/images/404/image.png';

import { useGetTeamMoodTrackerReportList } from '@api/team-mood-tracker/get/queries/useGetTeamMoodTrackerReportList';
import { useDeleteReport } from '@api/team-mood-tracker/post/mutations/useDeleteReport';

import { FileType } from '@common/types/file-type.enum';

import { ROUTES } from '@common/constants/routes.constants';

import { useWorkspaceId } from '@common/hooks/useWorkspaceId';

import ListDeleteButton from '@common/components/list-file/ListDeleteButton/ListDeleteButton.client';
import ListFileAiMeetingManagerSkeleton from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManagerSkeleton.server';
import ListFileTeamMoodTracker from '@common/components/list-file/ListFileTeamMoodTracker/ListFileTeamMoodTracker.client';
import ListHeader from '@common/components/list-file/ListHeader/ListHeader.server';

const ListFileTeamMoodTrackerWrapper = () => {
  const { workspaceId } = useWorkspaceId();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCheckMode, setIsCheckMode] = useState<boolean>(false);

  const {
    data: teamMoodTrackerReportList,
    isLoading: isReportLoading,
    refetch: refetchReportList,
  } = useGetTeamMoodTrackerReportList({ workspaceId });
  const { mutate: deleteSingleReport } = useDeleteReport(workspaceId);

  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const handleCheckToggle = (id: string) => {
    setSelectedReports((prev) => {
      if (prev.includes(id)) {
        return prev.filter((reportId) => reportId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = () => {
    router.push(
      ROUTES.MODAL.GENERAL.CONFIRM_DELETE(
        workspaceId,
        FileType.TEAM_MOOD_TRACKER,
        ROUTES.DOCUMENT_DELETE_CONFIRMED(workspaceId, FileType.TEAM_MOOD_TRACKER),
      ),
    );
  };

  useEffect(() => {
    setIsCheckMode(selectedReports.length > 0);
  }, [selectedReports.length]);

  const isCheckedReport = (currentReportId: string) =>
    selectedReports.map((id) => id === currentReportId).includes(true);

  useEffect(() => {
    const confirmed = searchParams.get('deleteConfirmed') ?? '';

    // 2. 모달에서 확인을 누르고 돌아왔는지 확인
    if (confirmed === 'true' && selectedReports.length > 0) {
      console.log('삭제가 최종 확인되었습니다. API를 호출합니다.');
      console.log('선택된 리포트 ID:', selectedReports);

      // 3. 로직 실행 후 URL에서 파라미터 정리
      // Next.js 13 이상에서는 router.replace를 사용해 URL을 깔끔하게 정리할 수 있습니다.
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('deleteConfirmed');
      router.replace(`?${newParams.toString()}`);

      // 선택된 리포트에 대해서 각각 삭제 요청을 보냄
      selectedReports.forEach((reportId) => {
        deleteSingleReport(reportId);
      });

      setSelectedReports([]);
    }
  }, [searchParams, router, selectedReports, deleteSingleReport, refetchReportList]);

  // NO HOOKS BELOW THIS LINE

  if (!teamMoodTrackerReportList || isReportLoading) {
    // TODO: 스켈레톤 자체 제작 필요
    return <ListFileAiMeetingManagerSkeleton />;
  }

  const moodTrackerList = teamMoodTrackerReportList.moodTrackerList;
  const hasLists = moodTrackerList.length > 0;

  return (
    <>
      {isCheckMode ? (
        <div className="pb-10pxr mt-7pxr mb-9pxr border-b-stroke-200 w-full border-b">
          <ListDeleteButton onClick={handleDelete} />
        </div>
      ) : (
        <ListHeader fileType={FileType.TEAM_MOOD_TRACKER} />
      )}
      {hasLists ? (
        moodTrackerList.map((list) => (
          <ListFileTeamMoodTracker
            key={list.moodTrackerHashedId}
            surveyId={list.moodTrackerHashedId}
            title={list.title}
            createdAt={list.updatedAt}
            dueDate={list.dueDate}
            respondentsNum={list.respondentsNum}
            isCheckMode={isCheckMode}
            isChecked={isCheckedReport(list.moodTrackerHashedId)}
            onCheckToggle={handleCheckToggle}
          />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <span className="text-b2-sb text-gray-300">내 팀 분위기 리포트가 없습니다.</span>
        </div>
      )}
    </>
  );
};

export default ListFileTeamMoodTrackerWrapper;
