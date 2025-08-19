'use client';

import { useRouter } from 'next/navigation';

import { PeopleList } from '@api/sns-event-assistant/api.types';

import { SnsEventAssistantListType } from '@common/types/download.enum.types';

import { ROUTES } from '@common/constants/routes.constants';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import DownloadButton from '@common/components/buttons/30px/DownloadButton/DownloadButton.client';

import CopyButton from '../../CopyButton/CopyButton.client';

interface SnsTopActionProps {
  workspaceId: string;
  snsEventId: string;
  onCopyClick: () => void;
  participantList?: PeopleList[];
  winnerList?: PeopleList[];
  type?: SnsEventAssistantListType;
}

const SnsTopAction = ({
  workspaceId,
  snsEventId,
  onCopyClick,
  participantList = [],
  winnerList = [],
  type = SnsEventAssistantListType.PARTICIPANT,
}: SnsTopActionProps) => {
  const router = useRouter();
  const handleToggleClick = (type: SnsEventAssistantListType) => {
    router.push(ROUTES.SNS_EVENT_ASSISTANT.DETAIL(workspaceId, snsEventId, type));
  };
  return (
    <div className="mt-23pxr mb-13pxr flex w-full justify-between">
      <div className="gap-x-8pxr flex">
        <CategoryOption
          label="참여자 리스트"
          active={type === SnsEventAssistantListType.PARTICIPANT || !type}
          count={participantList.length}
          onClick={() => handleToggleClick(SnsEventAssistantListType.PARTICIPANT)}
        />
        <CategoryOption
          label="당첨자 리스트"
          active={type === SnsEventAssistantListType.WINNER}
          count={winnerList.length}
          onClick={() => handleToggleClick(SnsEventAssistantListType.WINNER)}
        />
        <CategoryOption
          label="SNS 링크"
          active={type === SnsEventAssistantListType.LINK}
          onClick={() => handleToggleClick(SnsEventAssistantListType.LINK)}
        />
      </div>
      {type !== SnsEventAssistantListType.LINK && (
        <div className="gap-x-12pxr flex items-center">
          <CopyButton onClick={onCopyClick} />
          <DownloadButton
            onClick={() =>
              router.push(ROUTES.SNS_EVENT_ASSISTANT.DOWNLOAD(workspaceId, snsEventId, type))
            }
          />
        </div>
      )}
    </div>
  );
};

export default SnsTopAction;
