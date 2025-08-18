'use client';

import { useRef } from 'react';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import LeftTab from '@features/ai-meeting-manager/components/LeftTab/LeftTab.client';
import MeetingHeader from '@features/ai-meeting-manager/components/MeetingHeader/MeetingHeader.client';
import MeetingPanel from '@features/ai-meeting-manager/components/panels/MeetingPanel/MeetingPanel.client';
import ProceedingPanel from '@features/ai-meeting-manager/components/panels/ProceedingPanel/ProceedingPanel.client';

import EditKeymap from '../EditKeyMap/EditKeyMap.client';
import { AiMeetingMinutesContentProps } from './AiMeetingMinutes.types';

/**
 *
 * AiMeetingMinutesPage (`/minutes`)에서 사용하는 컴포넌트
 *
 * useRef 사용으로 인해 클라이언트 컴포넌트 분리함
 */
const AiMeetingMinutesClient = ({
  formattedLeftTab,
  isVoiceLogTab,
}: AiMeetingMinutesContentProps) => {
  // 편집 스코프: 제목/본문 간 이동 시 blur 저장 방지에 사용
  const editingScopeRef = useRef<HTMLDivElement>(null!);

  return (
    // 같은 편집 스코프로 묶음 - 수정 모드 위해
    <section className="flex flex-col" ref={editingScopeRef}>
      {isVoiceLogTab ? (
        <MeetingPanel pageType={AiMeetingPageType.MINUTES} leftTab={formattedLeftTab} />
      ) : (
        <>
          <EditKeymap editingScopeRef={editingScopeRef} />
          <MeetingHeader editingScopeRef={editingScopeRef} />
          <LeftTab current={formattedLeftTab} />
          <ProceedingPanel editingScopeRef={editingScopeRef} />
        </>
      )}
    </section>
  );
};

export default AiMeetingMinutesClient;
