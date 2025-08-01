'use client';

import Image from 'next/image';

import notFoundImage from '@assets/images/404/image.png';

import ListFileTeamMoodTracker from '@common/components/list-file/ListFileTeamMoodTracker/ListFileTeamMoodTracker.client';

// 임시 데이터
export const mockTeamMoodLists = [
  {
    surveyId: 'mood-001',
    title: '7월 3주차 팀 분위기 조사',
    createdAt: '2025.07.15',
    dueDate: '2025.07.20',
    respondentsNum: 8,
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
  {
    surveyId: 'mood-002',
    title: '7월 4주차 팀 분위기 조사',
    createdAt: '2025.07.22',
    dueDate: '2025.07.27',
    respondentsNum: 5,
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
  {
    surveyId: 'mood-003',
    title: '8월 1주차 회의 피드백',
    createdAt: '2025.07.29',
    dueDate: '2025.08.02',
    respondentsNum: 10,
    isCheckMode: true,
    isChecked: true,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
];

const ListFileTeamMoodTrackerWrapper = () => {
  const hasLists = mockTeamMoodLists.length > 0;
  return (
    <>
      {hasLists ? (
        mockTeamMoodLists.map((list) => <ListFileTeamMoodTracker key={list.surveyId} {...list} />)
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileTeamMoodTrackerWrapper;
