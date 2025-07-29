'use client';

import Image from 'next/image';

import notFoundImage from '@assets/images/404/image.png';

import ListFileAiMeetingManager from '@common/components/list-file/ListFileAiMeetingManager/ListFileAiMeetingManager.client';

// 임시 데이터
const mockMeetings = [
  {
    meetingId: '1',
    title: '주간 회의록',
    updatedAt: '2025.07.22',
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
  {
    meetingId: '2',
    title: 'OKR 점검 회의',
    updatedAt: '2025.07.20',
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
  {
    meetingId: '3',
    title: '디자인 리뷰',
    updatedAt: '2025.07.18',
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
  {
    meetingId: '4',
    title: '마케팅 전략 논의',
    updatedAt: '2025.07.15',
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`토글됨: ${id}`),
  },
];

const ListFileAiMeetingManagerWrapper = () => {
  const hasMeetings = mockMeetings.length > 0;
  return (
    <>
      {hasMeetings ? (
        mockMeetings.map((meeting) => (
          <ListFileAiMeetingManager key={meeting.meetingId} {...meeting} />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileAiMeetingManagerWrapper;
