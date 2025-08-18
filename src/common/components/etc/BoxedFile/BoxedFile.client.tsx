'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { BoxedFileProps } from './BoxedFile.types';

const BoxedFile = ({ title, lastOpened, thumbnailUrl, documentType, onClick }: BoxedFileProps) => {
  const documentIconMap = {
    [FileType.AI_MEETING_MANAGER]: FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE,
    [FileType.SNS_EVENT_ASSISTANT]: FeaturedFileIconsState.SIZE_24_SNS_ASSISTANT_FILE,
    [FileType.TEAM_MOOD_TRACKER]: FeaturedFileIconsState.SIZE_24_TEAM_MOOD_FILE,
  };
  const iconState = documentIconMap[documentType];
  const iconClass = 'absolute top-13pxr left-14pxr h-6 w-6';

  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const openedDate = new Date(lastOpened ?? '');
    const today = new Date();

    const isSameDate =
      today.getFullYear() === openedDate.getFullYear() &&
      today.getMonth() === openedDate.getMonth() &&
      today.getDate() === openedDate.getDate();

    const time = isSameDate
      ? `마지막으로 연 시간 ${openedDate.toLocaleTimeString()}`
      : openedDate.toLocaleDateString();

    setFormattedTime(time);
  }, [lastOpened]);

  return (
    <div
      className="w-244pxr h-191pxr py-17pxr shrink-0 rounded-2xl bg-gray-700 px-5 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-2.5 flex w-full shrink-0 flex-col items-start gap-0.5">
        {/* 폰트 시스템에 없어서 적용 안됨 양식만 맞줘 놓음 상태 */}
        <span className="text-t5-sb">{title}</span>
        <span className="text-cap2-rg text-gray-300">{formattedTime}</span>
      </div>
      {/* shadow box 나중에 수정 예정 */}
      <div className="h-108pxr rounded-10pxr relative w-full shrink-0 bg-white">
        {iconState && <FeaturedFileIcons state={iconState} className={clsx(iconClass)} />}

        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="파일 이미지"
            fill
            className="rounded-10pxr object-cover object-top pt-10"
          />
        ) : (
          <div className="pt-47pxr pb-13pxr flex flex-col gap-1 px-3.5">
            <div className="h-9pxr rounded-3pxr bg-gray-600" />
            <div className="h-9pxr rounded-3pxr bg-gray-600" />
            <div className="h-9pxr rounded-3pxr bg-gray-600" />
            <div className="h-9pxr rounded-3pxr bg-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxedFile;
