export enum LeftTabType {
  AiNotes = 'aiNotes',
  VoiceRecordings = 'voiceRecordings',
}

export const LeftTabLabels: Record<LeftTabType, string> = {
  [LeftTabType.AiNotes]: 'AI 회의록',
  [LeftTabType.VoiceRecordings]: '음성 기록',
};

export enum RightTabType {
  AiQuestions = 'aiQuestions',
  AiRecommendations = 'aiRecommendations',
}

export const RightTabLabels: Record<RightTabType, string> = {
  [RightTabType.AiQuestions]: 'AI 질문 기록',
  [RightTabType.AiRecommendations]: 'AI 추천 질문',
};
