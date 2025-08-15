'use client';

import { format } from 'date-fns';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import DefaultProfileImage from '@common/components/images/DefaultProfileImage/DefaultProfileImage.client';
import { ImageSize } from '@common/components/images/types/images.common.types';

import { FileCreatedInfoProps } from './FileCreatedInfo.types';

const FileCreatedInfo = ({
  name,
  userId,
  dateTime,
  profileSize = ImageSize.SMALL,
  isLoading = false,
  isDateTimeDeadline,
}: FileCreatedInfoProps) => {
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
  const rawName = name ?? '';
  const displayName = rawName.trim() ? rawName : '작성자 없음';
  const displayDate = formattedDateTime ?? '날짜 없음';

  return (
    <div className="text-cap2-md gap-5pxr py-2pxr flex items-center text-gray-400">
      {isLoading ? (
        <div className="gap-x-11pxr flex">
          <div className="w-52pxr h-16pxr animate-bg-pulse rounded-6pxr bg-gray-200" />
          <div className="w-150pxr h-16pxr animate-bg-pulse rounded-6pxr bg-gray-200" />
        </div>
      ) : (
        <>
          <DefaultProfileImage name={rawName} userId={userId} size={profileSize} />
          <span className="mr-11pxr">{displayName}</span>
          <IndividualIcons state={IndividualIconsState.CALENDAR_SIZE_16} />
          <span>{displayDate}</span>
        </>
      )}
    </div>
  );
};

export default FileCreatedInfo;
