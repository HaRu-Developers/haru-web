'use client';

import { useParams } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import BaseListFile from '../BaseListFile/BaseListFile.client';
import { ListFileSnsEventAssistantLinkProps } from './ListFileSnsEventAssistantLink.types';

const ListFileSnsEventAssistantLink = ({
  snsEventId,
  title,
  updatedAt,
  snsLink,
}: ListFileSnsEventAssistantLinkProps) => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const rightContent = (
    <div className="text-b3-rg w-330pxr gap-3pxr flex cursor-pointer items-center">
      <FeatureTabIcons state={FeatureTabIconsState.COPY} className="mr-1pxr" />
      <a
        href={snsLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-b3-rg flex cursor-pointer items-center text-black hover:underline"
      >
        {snsLink}
      </a>
    </div>
  );

  return (
    <BaseListFile
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
