'use client';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { SearchResultCardProps } from './SearchResultCard.types';

const SearchResultCard = ({ fileType, title, lastOpened, onClick }: SearchResultCardProps) => {
  const iconByFileType = (fileType: FileType) => {
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        return <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_AI_MANAGER_FILE} />;
      case FileType.SNS_EVENT_ASSISTANT:
        return <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_SNS_ASSISTANT_FILE} />;
      case FileType.TEAM_MOOD_TRACKER:
        return <FeaturedFileIcons state={FeaturedFileIconsState.SIZE_20_TEAM_MOOD_FILE} />;
      default:
        return null;
    }
  };

  const formatLastOpened = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // 날짜 부분만 비교하기 위해 시간 정보를 0으로 설정
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yesterdayOnly = new Date(nowOnly);
    yesterdayOnly.setDate(nowOnly.getDate() - 1);

    const isToday = dateOnly.getTime() === nowOnly.getTime();
    const isYesterday = dateOnly.getTime() === yesterdayOnly.getTime();

    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours < 12 ? '오전' : '오후';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinute = minutes.toString().padStart(2, '0');
      return `마지막으로 연 시간 ${period} ${formattedHour}:${formattedMinute}`;
    } else if (isYesterday) {
      return '어제';
    } else {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${month}월 ${day}일`;
    }
  };

  return (
    <div
      onClick={onClick}
      className="px-10pxr gap-x-8pxr h-40pxr rounded-8pxr flex w-full flex-shrink-0 flex-row items-center bg-white hover:bg-gray-600"
    >
      {iconByFileType(fileType)}
      <span className="text-t5-sb flex-grow text-black">{title} </span>
      <span className="text-cap2-rg text-gray-400">{formatLastOpened(lastOpened)}</span>
    </div>
  );
};

export default SearchResultCard;
