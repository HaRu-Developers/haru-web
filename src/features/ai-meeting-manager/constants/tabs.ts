export enum LeftTabType {
  MEETING_SUMMARY = 'MEETING_SUMMARY',
  MEETING_VOICE_LOG = 'MEETING_VOICE_LOG',
}

export const LeftTabLabels: Record<LeftTabType, string> = {
  [LeftTabType.MEETING_SUMMARY]: 'AI 회의록',
  [LeftTabType.MEETING_VOICE_LOG]: '음성 기록',
};

export enum RightTabType {
  AI_QUESTIONS = 'AI_QUESTIONS',
  AI_RECOMMENDATIONS = 'AI_RECOMMENDATIONS',
}

export const RightTabLabels: Record<RightTabType, string> = {
  [RightTabType.AI_QUESTIONS]: 'AI 질문 기록',
  [RightTabType.AI_RECOMMENDATIONS]: 'AI 추천 질문',
};
