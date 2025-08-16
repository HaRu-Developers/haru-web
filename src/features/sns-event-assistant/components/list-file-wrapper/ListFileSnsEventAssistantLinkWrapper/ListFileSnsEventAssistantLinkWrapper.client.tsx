'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import notFoundImage from '@assets/images/404/image.png';

import useSnsEventList from '@api/sns-event-assistant/get/queries/useSnsEventList';

import ListFileSnsEventAssistantLink from '@common/components/list-file/ListFileSnsEventAssistantLink/ListFileSnsEventAssistantLink.client';

const ListFileSnsEventAssistantLinkWrapper = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { extra: snsEvents } = useSnsEventList(workspaceId);
  const hasLinks = !!snsEvents;
  return (
    <>
      {hasLinks ? (
        snsEvents.snsEventList.map((event) => (
          <ListFileSnsEventAssistantLink
            key={event.snsEventId}
            snsEventId={event.snsEventId}
            snsLink={event.snsLink}
            title={event.title}
            updatedAt={`${event.updatedAt}`}
          />
        ))
      ) : (
        <div className="w-658pxr h-440pxr relative">
          <Image src={notFoundImage} alt="404 이미지" fill />
        </div>
      )}
    </>
  );
};

export default ListFileSnsEventAssistantLinkWrapper;
