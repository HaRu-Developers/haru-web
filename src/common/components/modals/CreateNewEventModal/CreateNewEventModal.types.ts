export interface CreateNewEventModalProps {
  onClose: () => void;
  onNextStep: () => void;
}

// types/eventConditions.ts
export interface PeriodCondition {
  isActive: boolean;
  endDate: Date | null;
}

export interface KeywordCondition {
  isActive: boolean;
  keyword: string[];
}

export interface FriendTagCondition {
  isActive: boolean;
  requiredFriendTag: number | null;
}

export interface EventConditions {
  winnerCount: number | null;
  period: PeriodCondition;
  keyword: KeywordCondition;
  friendTag: FriendTagCondition;
}

export interface CreateEventFormData {
  eventTitle: string;
  snsEventLink: string;
  selectedConditions: EventConditions;
}
