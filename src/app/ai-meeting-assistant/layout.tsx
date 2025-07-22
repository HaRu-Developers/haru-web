import type { Metadata } from 'next';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';
import GnbLeftLayout from '@common/components/layouts/GnbLeftLayout.server';

export const metadata: Metadata = {
  title: 'AI 회의 진행 매니저',
  description: 'HaRu의 AI 회의 진행 매니저 페이지입니다.',
};

const AiMeetingAssistantLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <GnbLeftLayout>
      <GnbTop section={GnbSection.AI_MEETING_MANAGER} />
      {children}
    </GnbLeftLayout>
  );
};

export default AiMeetingAssistantLayout;
