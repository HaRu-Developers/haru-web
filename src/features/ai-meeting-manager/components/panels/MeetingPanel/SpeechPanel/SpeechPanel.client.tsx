'use client';

import clsx from 'clsx';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import { useSpeechQuestionInfo } from '@features/ai-meeting-manager/hooks/stores/useSpeechQuestionStore';

import SpeechItem from './SpeechItem/SpeechItem.client';
import SpeechItemSkeleton from './SpeechItem/SpeechItemSkeleton.client';
import { SpeechPanelProps } from './SpeechPanel.types';

const SpeechPanel = ({ speeches, pageType, meetingStartTime }: SpeechPanelProps) => {
  const { isFetching } = useSpeechQuestionInfo();
  const isMeetingPage = pageType === AiMeetingPageType.MEETING;

  const noSpeeches = !isMeetingPage && speeches.length === 0;

  return (
    <div
      className={clsx(
        'pl-20pxr pr-14pxr pb-80pxr scrollbar-component w-full overflow-y-auto',
        isMeetingPage
          ? 'pt-20pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height))]'
          : 'pt-10pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height)_-_var(--tab-height))]',
      )}
    >
      {noSpeeches ? (
        <p className="px-28pxr py-18pxr text-b2-rg text-gray-300">회의 음성 기록이 없습니다.</p>
      ) : (
        <>
          {speeches.map((sp) => (
            <SpeechItem
              key={sp.segmentId}
              speechId={sp.segmentId}
              text={sp.text}
              speakerId={sp.speakerId}
              questions={sp.aiQuestions}
              startTime={sp.startTime}
              meetingStartTime={meetingStartTime}
            />
          ))}
          {isFetching && <SpeechItemSkeleton />}
        </>
      )}
    </div>
  );
};

export default SpeechPanel;
