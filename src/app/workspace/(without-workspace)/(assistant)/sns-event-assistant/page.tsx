import { GnbSection } from '@common/types/gnbs.types';

import WithoutWorkspaceSection from '@common/components/WithoutWorkspaceSection/WithoutWorkspaceSection.server';
import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

const SnsEventAssistantWithoutWorkspacePage = () => {
  return (
    <>
      <GnbTop section={GnbSection.SNS_EVENT_ASSISTANT} isSnsEventAssistantWithoutWorkspace />
      <WithoutWorkspaceSection />
    </>
  );
};

export default SnsEventAssistantWithoutWorkspacePage;
