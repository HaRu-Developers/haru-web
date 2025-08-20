import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';
import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';

import { calcElapsedSeconds, toMMSS } from '@common/utils/format-time.utils';

import { useFocusMapActions } from '@features/ai-meeting-manager/hooks/stores/useFocusMapStore';

import { SpeechItemProps } from './SpeechItem.types';
import { getSpeakerIconStateFromId, getSpeekerId } from './SpeechItem.utils';

const SpeechItem = ({
  speechId,
  text,
  speakerId,
  meetingStartTime,
  questions,
  startTime,
}: SpeechItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSpeechRef, unregisterSpeechRef, focusQuestionsBySpeech } = useFocusMapActions();

  const hasQuestion = questions && questions.length > 0;

  const formattedSpeakerId = getSpeekerId(speakerId);

  useEffect(() => {
    // cleanup 함수에서 ref.current가 변경될 수 있어 복사해 사용
    const currentRef = ref.current;
    registerSpeechRef(speechId, currentRef);
    return () => unregisterSpeechRef(speechId, currentRef ?? null);
  }, [speechId, registerSpeechRef, unregisterSpeechRef]);

  const speakerLabel = `발화자 ${formattedSpeakerId}`;
  const startAtLabel = toMMSS(calcElapsedSeconds(meetingStartTime, startTime));

  const iconState = getSpeakerIconStateFromId(formattedSpeakerId);

  return (
    <div
      role="button"
      ref={ref}
      data-speech-id={speechId}
      aria-label={`${speakerLabel} ${startAtLabel}`}
      onClick={() => focusQuestionsBySpeech(speechId)}
      className={clsx(
        'group/utt py-12pxr rounded-8pxr px-12pxr w-full',
        hasQuestion ? 'cursor-pointer hover:bg-gray-600' : '',
      )}
    >
      <div className="gap-x-12pxr flex">
        <SpeakerIcons state={iconState} className="shrink-0 cursor-default" />
        <div className="min-w-0 flex-1">
          <div className="gap-x-10pxr py-5pxr flex cursor-default items-center">
            <p className="text-t5-sb text-black">{speakerLabel}</p>
            <p className="text-b4-rg text-gray-400">{startAtLabel}</p>
          </div>

          <div className="gap-14pxr flex items-start">
            <p className="text-b3-rg whitespace-pre-wrap text-black">{text}</p>

            {hasQuestion && (
              <>
                {/* 기본 아이콘 */}
                <AiQuestionIcons
                  state={AiQuestionIconsState.SIZE_18}
                  className="block transition-opacity group-hover/utt:hidden"
                />

                {/* 호버 아이콘 */}
                <AiQuestionIcons
                  state={AiQuestionIconsState.SIZE_20_HOVER}
                  className="hidden transition-opacity group-hover/utt:block"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechItem;
