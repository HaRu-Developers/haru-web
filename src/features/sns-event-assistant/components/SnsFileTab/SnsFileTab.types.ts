import { SnsFileTabType } from '@features/sns-event-assistant/constants/tabs';

export interface TabProps {
  current: SnsFileTabType;
  counts: Partial<Record<SnsFileTabType, number>>;
}
