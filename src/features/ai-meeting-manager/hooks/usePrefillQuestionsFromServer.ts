'use client';

import { useEffect } from 'react';

import useFetchMeetingMinutesSpeechQuestion from '@api/meeting/get/queries/useFetchMeetingMinutesSpeechQuestion';

import { useSpeechQuestionActions } from './stores/useSpeechQuestionsStore';

/**
 * 서버 초기값을 스토어에 주입
 */
export const usePrefillQuestionsFromServer = (meetingId: string) => {
  const { extra } = useFetchMeetingMinutesSpeechQuestion(meetingId);
  const { setForSpeech } = useSpeechQuestionActions();

  useEffect(() => {
    const ts = extra?.transcripts ?? [];
    if (!ts.length) return;

    for (const t of ts) {
      const qs =
        (t.aiQuestions as Array<string | { question: string }> | undefined)?.map((q) =>
          typeof q === 'string' ? q : q.question,
        ) ?? [];
      if (qs.length) setForSpeech(String(t.segmentId), qs);
    }
  }, [extra?.transcripts, setForSpeech]);
};
