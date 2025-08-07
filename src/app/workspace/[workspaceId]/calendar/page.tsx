'use client';

import { useEffect, useRef, useState } from 'react';

import { notFound, useParams } from 'next/navigation';

import CalendarSection from '@common/components/etc/calendar/CalendarSection/CalendarSection.client';

/*
 * 캘린더 페이지 컴포넌트
 */

const CalendarPage = () => {
  // useParams로 URL 파라미터에서 workspaceId를 가져옵니다.
  const { workspaceId } = useParams<{ workspaceId: string }>();
  // NaN이면 not-found.tsx로 이동
  if (Number.isNaN(workspaceId)) {
    notFound();
  }

  const firstDay = useRef(new Date(new Date().setDate(1)));
  const firstDayValue = firstDay.current;
  const [currentDate, setCurrentDate] = useState<Date>(firstDayValue);

  const handleCalChange = (currentDate: Date) => {
    setCurrentDate(currentDate);
  };

  const handleFileClick = (id: number) => {
    console.log(`File with id ${id} clicked`); // 파일 클릭 시 이동 할 로직 필요
  };

  return (
    <CalendarSection
      workspaceId={Number(workspaceId)}
      currentDate={currentDate}
      onCalChange={handleCalChange}
      onFileClick={handleFileClick}
    />
  );
};

export default CalendarPage;
