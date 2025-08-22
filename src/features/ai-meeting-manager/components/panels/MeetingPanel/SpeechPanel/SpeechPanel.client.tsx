'use client';

import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import { useSpeechQuestionInfo } from '@features/ai-meeting-manager/hooks/stores/useSpeechQuestionStore';

import SpeechItem from './SpeechItem/SpeechItem.client';
import SpeechItemSkeleton from './SpeechItem/SpeechItemSkeleton.client';
import { SpeechPanelProps } from './SpeechPanel.types';

const SpeechPanel = ({ speeches, isMeetingPage, meetingStartTime }: SpeechPanelProps) => {
  const { isFetching } = useSpeechQuestionInfo();

  const noSpeeches = !isMeetingPage && speeches.length === 0;

  // 마지막 아이템에 포커스
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMeetingPage && lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [isMeetingPage, speeches.length]);

  return (
    <div
      className={clsx(
        'pl-20pxr pr-14pxr scrollbar-component w-full overflow-y-auto',
        isMeetingPage
          ? 'pt-20pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height)_-_var(--meeting-speech-panel-pb-height))] pb-[var(--meeting-speech-panel-pb-height)]'
          : 'pt-10pxr pb-80pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height)_-_var(--tab-height))]',
      )}
    >
      {noSpeeches ? (
        <p className="px-28pxr py-18pxr text-b2-rg text-gray-300">회의 음성 기록이 없습니다.</p>
      ) : (
        <>
          {speeches.map((sp, idx) => (
            <div key={sp.segmentId} ref={idx === speeches.length - 1 ? lastItemRef : null}>
              <SpeechItem
                speechId={sp.segmentId}
                text={sp.text}
                speakerId={sp.speakerId}
                questions={sp.aiQuestions}
                startTime={sp.startTime}
                meetingStartTime={meetingStartTime}
              />
            </div>
          ))}
          {isFetching && isMeetingPage && <SpeechItemSkeleton />}
        </>
      )}
    </div>
  );
};

export default SpeechPanel;
