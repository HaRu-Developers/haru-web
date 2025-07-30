'use client';

import Image from 'next/image';

import notFoundImage from '@assets/images/404/image.png';

import ListFileSnsEventAssistant from '@common/components/list-file/ListFileSnsEventAssistant/ListFileSnsEventAssistant.client';

// 임시 데이터
export const mockSnsEventList = [
  {
    snsEventId: 'sns-001',
    title: '7월 여름 이벤트 댓글 추첨',
    updatedAt: '2025.07.20',
    participantCount: 152,
    winnerCount: 10,
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`체크 토글됨: ${id}`),
  },
  {
    snsEventId: 'sns-002',
    title: '인스타그램 해시태그 이벤트',
    updatedAt: '2025.07.22',
    participantCount: 98,
    winnerCount: 5,
    isCheckMode: false,
    isChecked: false,
    onCheckToggle: (id: string) => console.log(`체크 토글됨: ${id}`),
  },
  {
    snsEventId: 'sns-003',
    title: '카카오톡 채널 친구추가 이벤트',
    updatedAt: '2025.07.28',
    participantCount: 200,
    winnerCount: 20,
    isCheckMode: true,
    isChecked: true,
    onCheckToggle: (id: string) => console.log(`체크 토글됨: ${id}`),
  },
];

const ListFileSnsEventAssistantWrapper = () => {
  const hasLists = mockSnsEventList.length > 0;
  return (
    <>
      {hasLists ? (
        mockSnsEventList.map((list) => (
          <ListFileSnsEventAssistant key={list.snsEventId} {...list} />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileSnsEventAssistantWrapper;
