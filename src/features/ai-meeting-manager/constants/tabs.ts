export enum LeftTabType {
  AI_NOTES = 'AI_NOTES',
  VOICE_RECORDINGS = 'VOICE_RECORDINGS',
}

export const LeftTabLabels: Record<LeftTabType, string> = {
  [LeftTabType.AI_NOTES]: 'AI 회의록',
  [LeftTabType.VOICE_RECORDINGS]: '음성 기록',
};

export enum RightTabType {
  AI_QUESTIONS = 'AI_QUESTIONS',
  AI_RECOMMENDATIONS = 'AI_RECOMMENDATIONS',
}

export const RightTabLabels: Record<RightTabType, string> = {
  [RightTabType.AI_QUESTIONS]: 'AI 질문 기록',
  [RightTabType.AI_RECOMMENDATIONS]: 'AI 추천 질문',
};
