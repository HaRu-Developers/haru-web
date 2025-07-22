'use client';

import { useMemo, useState } from 'react';

import { DocumentType } from '@common/components/etc/BoxedFile/BoxedFile.types';
import Calender from '@common/components/etc/calender/Calender/Calender.client';
import { DocumentFile } from '@common/components/etc/calender/types/calender.common.types';

// 벡엔드 방식으로 변경 예정 -> 일단 예시로만 사용
const getCalendarDates = (currentDate: Date) => {
  const firstDayOfMonth = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const title = `${firstDayOfMonth.getFullYear()}년 ${firstDayOfMonth.getMonth() + 1}월`;

  const sunday = new Date(firstDayOfMonth);
  sunday.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  const monthLater = new Date(sunday);
  monthLater.setDate(sunday.getDate() + 34);

  const operatingMonth = firstDayOfMonth.getMonth() + 1;

  const mockDocuments: DocumentFile[][] = []; // 월을 따로 포함 하지 않아서 임시 값으로 하면 그대로 위치 함
  const numberOfDays =
    Math.floor((monthLater.getTime() - sunday.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  for (let i = 0; i < numberOfDays; i++) {
    mockDocuments.push([]);
  }

  if (mockDocuments[2]) {
    mockDocuments[2].push({
      id: 1,
      title: `회의록 - 2025년 6월 24일`,
      type: DocumentType.AI_MEETING_MANAGER,
    });
  }

  if (mockDocuments[9]) {
    mockDocuments[9].push(
      {
        id: 2,
        title: `7월 8일 회의록`,
        type: DocumentType.AI_MEETING_MANAGER,
      },
      {
        id: 3,
        title: `SNS 이벤트 초안`,
        type: DocumentType.SNS_EVENT_ASSISTANT,
      },
      {
        id: 4,
        title: `팀 분위기 보고서 Q1`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
      {
        id: 5,
        title: `팀 분위기 보고서 Q2`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
      {
        id: 6,
        title: `팀 분위기 보고서 Q3`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
      {
        id: 7,
        title: `팀 분위기 보고서 Q4`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
      {
        id: 8,
        title: `팀 분위기 보고서 Q5`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
      {
        id: 9,
        title: `팀 분위기 보고서 Q6`,
        type: DocumentType.TEAM_MOOD_TRACKER,
      },
    );
  }

  if (mockDocuments[19]) {
    mockDocuments[19].push({
      id: 10,
      title: `월간 회의록 요약`,
      type: DocumentType.AI_MEETING_MANAGER,
    });
  }

  return {
    sunday,
    monthLater,
    title,
    operatingMonth,
    mockDocuments,
  };
};

const Page = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { sunday, monthLater, title, operatingMonth, mockDocuments } = useMemo(
    () => getCalendarDates(currentDate),
    [currentDate],
  );

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };
  // 글자 크기 정확하지 않음
  return (
    <div className="h-1080pxr flex w-[1920px]">
      <div className="w-240pxr h-1024pxr flex items-center justify-center bg-gray-500">
        GND 좌측
      </div>
      <div className="flex flex-col">
        <div className="h-124pxr flex w-[1200px] items-center justify-center bg-gray-500">
          GNB 상단
        </div>
        <div className="mt-36pxr mb-16pxr flex w-full justify-center">
          <div className="w-1030pxr h-27pxr flex items-center justify-between">
            <span className="text-t4-bd">{title}</span>
            <div className="gap-2pxr flex items-center justify-between">
              {/* 버튼 2개 svg 추가 변경 예정 */}
              <button className="select-none" onClick={goToPreviousMonth}>
                &lt;
              </button>
              <span
                className="text-b3-rg select-none"
                onClick={goToToday}
                style={{ cursor: 'pointer' }}
              >
                오늘
              </span>
              <button className="select-none" onClick={goToNextMonth}>
                &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-28pxr w-1030pxr grid grid-cols-7">
            {days.map((day) => (
              <span key={day} className="w-147pxr text-bt3-sb flex justify-center text-gray-300">
                {day}
              </span>
            ))}
          </div>
          <Calender
            startDate={sunday}
            endDate={monthLater}
            documents={mockDocuments}
            operatingMonth={operatingMonth}
            onFileClick={(id: number) => console.log(`Clicked on file with id: ${id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
