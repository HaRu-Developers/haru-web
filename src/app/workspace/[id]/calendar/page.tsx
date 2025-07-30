'use client';

import { useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import CalendarFull from '@common/components/etc/calendar/calendar-full/CalendarFull/CalendarFull.client';
import {
  DocumentFile,
  DocumentType,
} from '@common/components/etc/calendar/types/calendar.common.types';
import { getCalendarDates } from '@common/components/etc/calendar/utils/calendar-date.utils';

/*
 * 캘린더 페이지 컴포넌트
 * util 함수를 사용하여 처음 시작일과 종료일은 기본 설정합니다.
 * 이후 startDate, endDate, path의 id값, 유저 토큰을 이용하여 /api/v1/workspaces/{workspaceId}/calendar get 요청을 합니다.
 *
 * 나중에 [][]이 아닌 Record<string, string>으로 설정하여 변경 할 수도 있습니다.
 *
 * import { defaultApi } from '@lib/fetcher';
 * import { useCallback } from 'react';
 * 추후 api 연동 시 사용 됨
 *
 * 사용 할 인터페이스
 * import { FileType } from '@common/types/file-type.enum';
 *
 * export interface ApiDocumentFile {
 * documentId: number;
 * title: string;
 * documentType: FileType;
 * created_at: string;
 * }
 *
 * export interface CalendarApiResponse { //commonResponse 불러 오는 방향으로 설정 가능
 * isSuccess: boolean;
 * code: string;
 * message: string;
 * result: {
 * documentList: ApiDocumentFile[];
 * };
 * }
 */

const CalendarPage = () => {
  const { id: workspaceId } = useParams<{ id: string }>(); // Long 타입이긴 하지만 일단 string으로 받아옴
  useEffect(() => {
    console.log(`현재 워크스페이스의 ID: ${workspaceId}`); // workspaceId 확인용
  }, [workspaceId]);
  const firstDay = useRef(new Date(new Date().setDate(1)));
  const firstDayValue = firstDay.current;
  const { startDate: initialStart, endDate: initialEnd } = getCalendarDates(firstDayValue);

  const [startDate, setStartDate] = useState<Date>(initialStart);
  const [endDate, setEndDate] = useState<Date>(initialEnd);
  const [currentDate, setCurrentDate] = useState<Date>(firstDayValue);
  const [documents, setDocuments] = useState<DocumentFile[][]>(
    Array(35)
      .fill([])
      .map(() => []),
  );

  // 더미 데이터 용 useEffect -> 실제 API 연동 시 제거 예정
  useEffect(() => {
    const newDocuments: DocumentFile[][] = Array(35)
      .fill([])
      .map(() => []);

    if (currentDate.toDateString() === firstDayValue.toDateString()) {
      newDocuments[2] = [
        {
          id: 1,
          title: '회의록 - 7월 1일',
          type: DocumentType.AI_MEETING_MANAGER,
        },
        {
          id: 2,
          title: 'SNS 이벤트 - 7월 1일',
          type: DocumentType.SNS_EVENT_ASSISTANT,
        },
        {
          id: 3,
          title: '팀 분위기 기록 - 7월 1일',
          type: DocumentType.TEAM_MOOD_TRACKER,
        },
        {
          id: 4,
          title: '회의록 - 7월 1일',
          type: DocumentType.AI_MEETING_MANAGER,
        },
        {
          id: 5,
          title: '회의록 - 7월 1일',
          type: DocumentType.AI_MEETING_MANAGER,
        },
      ];
      newDocuments[20] = [
        {
          id: 6,
          title: '회의록 - 7월 19일',
          type: DocumentType.AI_MEETING_MANAGER,
        },
      ];
    } else {
      newDocuments[0] = [];
    }

    setDocuments(newDocuments);
  }, [currentDate, firstDayValue]);

  // api 요청 방식 -> 아직 벡엔드 개발 중
  // const accessToken = 'test'; // 실제 토큰 로직으로 변경 예정

  // const getCalendar = useCallback(async () => {
  //   if (!workspaceId || !accessToken) return;
  //   const queryParams = new URLSearchParams({
  //     startDate: startDate.toISOString(),
  //     endDate: endDate.toISOString(),
  //   }).toString();

  //   const url = `/api/v1/workspaces/${workspaceId}/calendar?${queryParams}`;

  //   try {
  //     const response = await defaultApi<CalendarApiResponse>(url, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (response.isSuccess && response.result && response.result.documentList) {
  //       setDocuments(response.result.documentList); // 날짜 별로 문서 파일 배열 설정하는 로직이 필요함
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch calendar data:', error);
  //   }
  // }, [workspaceId, accessToken, startDate, endDate, currentDate]);

  // useEffect(() => {
  //   getCalendar();
  // }, [getCalendar]);

  const handleCalChange = (newStartDate: Date, newEndDate: Date, currentDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setCurrentDate(currentDate);
  };

  const handleFileClick = (id: number) => {
    console.log(`File with id ${id} clicked`); // 파일 클릭 시 이동 할 로직 필요
  };

  return (
    <CalendarFull
      documents={documents}
      currentDate={currentDate}
      onCalChange={handleCalChange}
      onFileClick={handleFileClick}
    />
  );
};

export default CalendarPage;
