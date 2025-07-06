export enum AiMeetingAssistantLeftTabType {
  AiNotes = 'aiNotes',
  VoiceRecordings = 'voiceRecordings',
}

export const AiMeetingAssistantLeftTabLabels: Record<AiMeetingAssistantLeftTabType, string> = {
  [AiMeetingAssistantLeftTabType.AiNotes]: 'AI 회의록',
  [AiMeetingAssistantLeftTabType.VoiceRecordings]: '음성 기록',
};

export enum AiMeetingAssistantRightTabType {
  AiQuestions = 'aiQuestions',
  AiRecommendations = 'aiRecommendations',
}

export const AiMeetingAssistantRightTabLabels: Record<AiMeetingAssistantRightTabType, string> = {
  [AiMeetingAssistantRightTabType.AiQuestions]: 'AI 질문 기록',
  [AiMeetingAssistantRightTabType.AiRecommendations]: 'AI 추천 질문',
};
