import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import { LeftTabType } from '../../LeftTab/LeftTab.types';

export interface MeetingPanelProps {
  pageType: AiMeetingPageType;
  leftTab?: LeftTabType;
}
