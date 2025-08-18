import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';
import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';

import { useFocusMapActions } from '@features/ai-meeting-manager/hooks/stores/useFocusMapStore';

import { SpeechItemProps } from './SpeechItem.types';
import { getSpeakerIconStateFromId, getSpeekerId, toMMSS } from './SpeechItem.utils';

const SpeechItem = ({
  speechId,
  text,
  speakerId,
  meetingStartTime,
  questions,
  startTime,
}: SpeechItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSpeechRef, unregisterSpeechRef, focusQuestionBySpeech } = useFocusMapActions();

  const hasQuestion = questions.length > 0;

  const formattedSpeakerId = getSpeekerId(speakerId);

  useEffect(() => {
    // cleanup 함수에서 ref.current가 변경될 수 있어 복사해 사용
    const currentRef = ref.current;
    registerSpeechRef(speechId, currentRef);
    return () => unregisterSpeechRef(speechId, currentRef ?? null);
  }, [speechId, registerSpeechRef, unregisterSpeechRef]);

  const onFocusQuestion = (speechId: number) => {
    console.log(speechId, `${speechId} 발화 포커스`);
  };

  const calcSeekSeconds = (speechStartIso: string) => {
    const base = new Date(meetingStartTime).getTime();
    const t = new Date(speechStartIso).getTime();
    if (!Number.isFinite(base) || !Number.isFinite(t)) return 0;
    return Math.max(0, (t - base) / 1000);
  };

  const speakerLabel = `발화자 ${formattedSpeakerId}`;
  const seek = calcSeekSeconds(startTime);
  const startAtLabel = toMMSS(seek);

  const iconState = getSpeakerIconStateFromId(formattedSpeakerId);

  return (
    <div
      role="button"
      ref={ref}
      data-speech-id={speechId}
      aria-label={`${speakerLabel} ${startAtLabel}`}
      onClick={() => focusQuestionBySpeech(speechId)}
      className={clsx(
        'group/utt py-12pxr rounded-8pxr w-full cursor-pointer',
        hasQuestion ? 'pl-32pxr' : 'px-32pxr',
      )}
    >
      <div className="gap-x-12pxr flex">
        <SpeakerIcons state={iconState} className="shrink-0 cursor-default" />
        <div className="min-w-0 flex-1">
          <div className="gap-x-10pxr py-5pxr flex cursor-default items-center">
            <p className="text-t5-sb truncate text-black">{speakerLabel}</p>
            <p className="text-b4-rg text-gray-400">{startAtLabel}</p>
          </div>

          <div className={clsx('flex justify-between')}>
            <p className="text-b3-rg break-words whitespace-pre-wrap text-black">{text}</p>

            {hasQuestion && (
              <>
                {/* 기본 아이콘 */}
                <button
                  type="button"
                  aria-label="질문 보기"
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 onClick 막기
                    onFocusQuestion(speechId);
                  }}
                  className="block transition-opacity group-hover/utt:hidden"
                >
                  <AiQuestionIcons state={AiQuestionIconsState.SIZE_18} />
                </button>

                {/* 호버 아이콘 */}
                <button
                  type="button"
                  aria-label="질문 보기"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFocusQuestion(speechId);
                  }}
                  className="hidden transition-opacity group-hover/utt:block"
                >
                  <AiQuestionIcons state={AiQuestionIconsState.SIZE_20_HOVER} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechItem;
