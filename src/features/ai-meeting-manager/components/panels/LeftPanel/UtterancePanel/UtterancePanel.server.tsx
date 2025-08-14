import clsx from 'clsx';

// import GnbBottomRecorderBar from '@common/components/gnbs/gnb-audio-bar/GnbBottomRecorderBar/GnbBottomRecorderBar.client';

import { AiMeetingPageType } from '@features/ai-meeting-manager/types/page-type.types';

import UtteranceItem from './UtteranceItem/UtteranceItem.client';
import { UtterancePanelProps } from './UtterancePanel.types';

const UtterancePanel = ({ page }: UtterancePanelProps) => {
  const isMeetingPage = page === AiMeetingPageType.MEETING;

  return (
    <div className="relative">
      <div
        className={clsx(
          'pr-26pxr pb-20pxr scrollbar-component overflow-y-auto',
          isMeetingPage
            ? 'pt-20pxr'
            : 'pt-10pxr max-h-[calc(100dvh-var(--gnb-top-height)-var(--meeting-header-height)-var(--tab-height))]',
        )}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <UtteranceItem key={idx} hasRecommandation={false} />
        ))}
      </div>
      <div className="mb-16pxr fixed mx-auto">{/* <GnbBottomRecorderBar /> */}</div>
    </div>
  );
};

export default UtterancePanel;
