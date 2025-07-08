export enum LeftTabType {
  AI_NOTES = 'aiNotes',
  VOICE_RECORDINGS = 'voiceRecordings',
}

export const LeftTabLabels: Record<LeftTabType, string> = {
  [LeftTabType.AI_NOTES]: 'AI 회의록',
  [LeftTabType.VOICE_RECORDINGS]: '음성 기록',
};

export enum RightTabType {
  AI_QUESTIONS = 'aiQuestions',
  AI_RECOMMENDATIONS = 'aiRecommendations',
}

export const RightTabLabels: Record<RightTabType, string> = {
  [RightTabType.AI_QUESTIONS]: 'AI 질문 기록',
  [RightTabType.AI_RECOMMENDATIONS]: 'AI 추천 질문',
};

// ✅ enum 통일
// AI_MEETING_MANAGER
// SNS_EVENT_ASSISTANT
// TEAM_MOOD_TRACKER
