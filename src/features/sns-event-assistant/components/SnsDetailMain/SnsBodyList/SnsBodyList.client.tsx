'use client';

import { PeopleList } from '@api/sns-event-assistant/api.types';

import { SnsEventAssistantListType } from '@common/types/download.enum.types';

import RosterList from '@common/components/RosterList/RosterList.server';

import SnsLinkItem from '../../SnsLinkItem/SnsLinkItem.client';

interface SnsBodyListProps {
  winnerList?: PeopleList[];
  participantList?: PeopleList[];
  type: SnsEventAssistantListType;
  title?: string;
  link?: string;
  onCopyClick?: () => void;
}
const SnsBodyList = ({
  winnerList,
  participantList,
  type,
  link = '',
  title = '',
  onCopyClick,
}: SnsBodyListProps) => {
  const items = type === SnsEventAssistantListType.WINNER ? winnerList : participantList;
  const leftItems = items?.filter((_, index) => index < items.length / 2) ?? [];
  const rightItems = items?.filter((_, index) => index >= items.length / 2) ?? [];
  return (
    <div className="mt-28pxr flex w-full justify-center">
      {type == SnsEventAssistantListType.LINK ? (
        <SnsLinkItem title={title} link={link} onClick={onCopyClick} />
      ) : (
        <>
          <RosterList items={leftItems ?? []} />
          <RosterList items={rightItems ?? []} hasLeftBorder={true} startIndex={leftItems.length} />
        </>
      )}
    </div>
  );
};

export default SnsBodyList;
