import { SnsFileTabType } from '../SnsFileTab/SnsFileTab.types';
import { SnsFilePanelProps } from './SnsFilePanel.types';
import ParticipantList from './components/ParticipantList/ParticipantList.server';
import SnsLink from './components/SnsLink/SnsLink.server';
import WinnerList from './components/WinnerList/WinnerList.server';

const SnsFilePanel = ({ tab }: SnsFilePanelProps) => {
  switch (tab) {
    case SnsFileTabType.PARTICIPANT_LIST:
      return <ParticipantList />;
    case SnsFileTabType.WINNER_LIST:
      return <WinnerList />;
    case SnsFileTabType.SNS_LINK:
      return <SnsLink />;
  }
};

export default SnsFilePanel;
