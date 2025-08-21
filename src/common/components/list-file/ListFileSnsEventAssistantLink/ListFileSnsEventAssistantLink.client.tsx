'use client';

import { useParams } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import { ListFileSnsEventAssistantLinkProps } from './ListFileSnsEventAssistantLink.types';
import LinkBaseListFile from '../LinkBaseListFile/LinkBaseListFile.client';
import LinkText from '@features/sns-event-assistant/components/LinkText/LinkText.client';
import CopyButton from '@features/sns-event-assistant/components/CopyButton/CopyButton.client';
import { useToastActions } from '@common/hooks/stores/useToastStore';
import { ToastType } from '@common/types/toast.types';

const ListFileSnsEventAssistantLink = ({
  snsEventId,
  title,
  updatedAt,
  snsLink,
}: ListFileSnsEventAssistantLinkProps) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { addToast } = useToastActions();
  const handleCopy = () => {
    addToast({
      type: ToastType.SUCCESS,
      text: '링크가 복사되었습니다.',
      duration: 2000,
    });
  };
  
  const rightContent = (
    <div className="text-b3-rg w-330pxr gap-3pxr flex cursor-pointer items-center">
      <CopyButton link={snsLink} isHoverable={false} onClick={handleCopy} />
      <LinkText text={snsLink} />
    </div>
  );

  return (
    <LinkBaseListFile
      id={snsEventId}
      title={title}
      subtitle={updatedAt}
      href={ROUTES.SNS_EVENT_ASSISTANT.DETAIL(workspaceId, snsEventId)}
      fileIconState={FeaturedFileIconsState.SIZE_24_SNS_ASSISTANT_FILE}
      rightContent={rightContent}
      isSelectable={false}
    />
  );
};

export default ListFileSnsEventAssistantLink;
