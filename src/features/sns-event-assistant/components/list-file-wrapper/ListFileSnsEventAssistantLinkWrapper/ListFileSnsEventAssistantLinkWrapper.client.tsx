'use client';

import Image from 'next/image';

import notFoundImage from '@assets/images/404/image.png';

import ListFileSnsEventAssistantLink from '@common/components/list-file/ListFileSnsEventAssistantLink/ListFileSnsEventAssistantLink.client';

// 임시 데이터
export const mockSnsEventLinks = [
  {
    snsEventId: 'link-001',
    title: '7월 인스타그램 링크 이벤트',
    updatedAt: '2025.07.20',
    snsLink: 'https://instagram.com/haru_event_7july',
  },
  {
    snsEventId: 'link-002',
    title: '카카오톡 채널 친구추가 링크',
    updatedAt: '2025.07.22',
    snsLink: 'https://pf.kakao.com/_abcd1234',
  },
  {
    snsEventId: 'link-003',
    title: '페이스북 이벤트 페이지 링크',
    updatedAt: '2025.07.28',
    snsLink: 'https://facebook.com/events/haru_summer2025',
  },
];

const ListFileSnsEventAssistantLinkWrapper = () => {
  const hasLinks = mockSnsEventLinks.length > 0;
  return (
    <>
      {hasLinks ? (
        mockSnsEventLinks.map((link) => (
          <ListFileSnsEventAssistantLink key={link.snsEventId} {...link} />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileSnsEventAssistantLinkWrapper;
