import { PeopleList } from '@api/sns-event-assistant/api.types';

export interface RosterListProps {
  items: PeopleList[];
  hasLeftBorder?: boolean;
  startIndex?: number;
}
