'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import useSnsEvent from '@api/sns-event-assistant/get/queries/useSnsEvent';
import useUpdateSnsEventMutation from '@api/sns-event-assistant/patch/mutations/useUpdateSnsEventMutation';

import { GnbSection } from '@common/types/gnbs.types';

import GnbTop from '@common/components/gnbs/GnbTop/GnbTop.client';

import SnsDetailMain from '@features/sns-event-assistant/components/SnsDetailMain/SnsDetailMain.client';

const SnsEventAssistantDetailPage = () => {
  const { snsEventId } = useParams<{ snsEventId: string }>();
  const { extra: sns } = useSnsEvent(snsEventId);
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    if (sns?.title !== title) {
      setTitle(sns?.title ?? '');
    }
  }, [sns, title]);

  const { mutate } = useUpdateSnsEventMutation();
  const handleTitleSave = (newTitle: string) => {
    mutate(
      { snsEventId, title: newTitle },
      {
        onSuccess: () => {
          if (!newTitle) return;
          setTitle(newTitle);
        },
      },
    );
  };
  return (
    <section>
      <GnbTop section={GnbSection.CUSTOM} title={title} />
      <div className="flex w-full flex-col">
        <SnsDetailMain snsEventId={snsEventId} sns={sns} onTitleSave={handleTitleSave} />
      </div>
    </section>
  );
};

export default SnsEventAssistantDetailPage;
