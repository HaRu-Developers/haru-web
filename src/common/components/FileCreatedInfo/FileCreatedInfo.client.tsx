'use client';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

import { FileCreatedInfoProps } from './FileCreatedInfo.types';

const FileCreatedInfo = ({ name, userId, dateTime }: FileCreatedInfoProps) => {
  return (
    <div className="text-cap2-md gap-5pxr py-2pxr flex font-semibold text-gray-400">
      <DefaultProfileImage name={name} userId={userId} size={ImageSize.XSMALL} />
      <span className="mr-11pxr">{name}</span>
      <IndividualIcons state={IndividualIconsState.CALENDAR_SIZE_16} />
      <span>{dateTime}</span>
    </div>
  );
};

export default FileCreatedInfo;
