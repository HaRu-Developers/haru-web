export interface SnsTopProps {
  snsEventId: string;
  snsLink: string;
  title: string;
  creatorId: string;
  creatorName: string;
  updatedAt: Date;
  participantCount: number;
  winnerCount: number;
  isCreator?: boolean;
  isParticipant?: boolean;
  isWinner?: boolean;
}
