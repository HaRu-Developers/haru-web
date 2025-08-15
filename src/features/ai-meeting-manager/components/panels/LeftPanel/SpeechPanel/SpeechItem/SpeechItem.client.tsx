import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';
import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';
import { SpeakerIconsState } from '@icons/SpeakerIcons/SpeakerIcons.types';

import { useFocusMapActions } from '@features/ai-meeting-manager/hooks/stores/useFocusMapStore';

import { SpeechItemProps } from './SpeechItem.types';

// utils: 초 → MM:SS
const toMMSS = (sec: number) => {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const SpeechItem = ({
  speechId,
  text,
  speakerId,
  hasQuestion,
  questions,
  startTime,
  calcSeekSeconds,
}: SpeechItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSpeechRef, unregisterSpeechRef, focusQuestionBySpeech } = useFocusMapActions();
  useEffect(() => {
    registerSpeechRef(speechId, ref.current);
    return () => unregisterSpeechRef(speechId, ref.current ?? undefined);
  }, [speechId, registerSpeechRef, unregisterSpeechRef]);

  const onFocusQuestion = (speechId: string) => {
    console.log(speechId, `발화자 ${speechId} 포커스`);
  };

  const speakerLabel = `발화자 ${speakerId}`;
  const seek = calcSeekSeconds(startTime);
  const startAtLabel = toMMSS(seek);

  // 키보드 접근성: Enter/Space로 focusQuestionBySpeech 트리거
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      focusQuestionBySpeech(speechId, { flashMs: 1200 });
    }
  };

  return (
    <div
      role="button"
      ref={ref}
      data-speech-id={speechId}
      tabIndex={0}
      aria-label={`${speakerLabel} ${startAtLabel}`}
      onClick={() => focusQuestionBySpeech(speechId, { flashMs: 1200 })}
      onKeyDown={onKey}
      className={clsx(
        'group/utt py-12pxr rounded-8pxr w-full cursor-pointer',
        hasQuestion ? 'pl-32pxr' : 'px-32pxr',
      )}
    >
      <div className="gap-x-12pxr flex">
        <SpeakerIcons state={SpeakerIconsState.USER_1} className="shrink-0 cursor-default" />
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
                    e.stopPropagation(); // 부모 onClick(시킹) 막기
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
