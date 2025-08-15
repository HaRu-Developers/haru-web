'use client';

import { useMemo } from 'react';

import { useSpeechQuestionInfo } from './stores/useSpeechQuestionsStore';

const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase();

export type UiQuestion = {
  id: string; // `${speechId}-${norm(text)}`
  text: string;
  speechId: string;
};

export const useAiQuestions = () => {
  const { map: bySpeechId } = useSpeechQuestionInfo();

  const questions = useMemo<UiQuestion[]>(() => {
    const out: UiQuestion[] = [];
    const seen = new Set<string>();
    for (const [speechId, qs] of Object.entries(bySpeechId)) {
      for (const q of qs ?? []) {
        const key = `${speechId}-${norm(q)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ id: key, text: q, speechId });
      }
    }
    return out;
  }, [bySpeechId]);

  const hasMeetingLog = Object.keys(bySpeechId).length > 0;
  return { questions, hasMeetingLog };
};
