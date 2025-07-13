import { TabType } from '@features/sns-event-assistant/constants/tabs';

export interface TabProps {
  current: TabType;
  counts: Partial<Record<TabType, number>>;
}
