'use client';

import clsx from 'clsx';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import SpeechItem from './SpeechItem/SpeechItem.client';
import { SpeechPanelProps } from './SpeechPanel.types';

const SpeechPanel = ({ speeches, pageType, meetingStartTime }: SpeechPanelProps) => {
  const isMeetingPage = pageType === AiMeetingPageType.MEETING;

  return (
    <div
      className={clsx(
        'pl-20pxr pr-14pxr pb-80pxr scrollbar-component w-full overflow-y-auto',
        isMeetingPage
          ? 'pt-20pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height))]'
          : 'pt-10pxr h-[calc(100dvh_-_var(--gnb-top-height)_-_var(--meeting-header-height)_-_var(--tab-height))]',
      )}
    >
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
    </div>
  );
};

export default SpeechPanel;
