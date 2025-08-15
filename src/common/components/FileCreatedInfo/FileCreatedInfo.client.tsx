'use client';

import { format } from 'date-fns';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

import { FileCreatedInfoProps } from './FileCreatedInfo.types';

const FileCreatedInfo = ({ name, userId, dateTime, isDateTimeDeadline }: FileCreatedInfoProps) => {
  /**
   * dateTime(ISO 형식 문자열)이 존재할 경우, 원하는 형식으로 가공합니다.
   * 예: "2025년 8월 6일, 1:03 AM"
   *
   * (PM 요구사항) isDateTimeDeadline이 true인 경우, 마감 문구를 추가합니다.
   */
  const formattedDateTime = dateTime
    ? format(
        new Date(dateTime),
        isDateTimeDeadline ? 'yyyy년 M월 d일, h:mm a 마감' : 'yyyy년 M월 d일, h:mm a',
      )
    : '';

  return (
    <div className="text-cap2-md gap-5pxr py-2pxr flex text-gray-400">
      <DefaultProfileImage name={name} userId={userId} size={ImageSize.SMALL} />
      <span className="mr-11pxr">{name}</span>
      <IndividualIcons state={IndividualIconsState.CALENDAR_SIZE_16} />
      <span>{formattedDateTime}</span>
    </div>
  );
};

export default FileCreatedInfo;
