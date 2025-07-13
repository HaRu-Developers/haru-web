import { TabType } from '@features/sns-event-assistant/constants/tabs';

import { PanelProps } from './Panel.types';
import ParticipantList from './components/ParticipantList/ParticipantList.server';
import SnsLink from './components/SnsLink/SnsLink.server';
import WinnerList from './components/WinnerList/WinnerList.server';

const Panel = ({ tab }: PanelProps) => {
  switch (tab) {
    case TabType.PARTICIPANT_LIST:
      return <ParticipantList />;
    case TabType.WINNER_LIST:
      return <WinnerList />;
    case TabType.SNS_LINK:
      return <SnsLink />;
  }
};

export default Panel;
