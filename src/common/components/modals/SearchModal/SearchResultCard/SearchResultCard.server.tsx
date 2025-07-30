import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { FileType } from '@common/types/file-type.enum';

import { SearchResultCardProps } from './SearchResultCard.types';

const SearchResultCard = ({ fileType, title, lastOpened }: SearchResultCardProps) => {
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

  const formatLastOpened = (date: Date) => {
    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate();

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
    <div className="px-10pxr gap-x-8pxr h-40pxr rounded-100pxr flex w-full flex-shrink-0 flex-row items-center bg-white hover:bg-gray-600">
      {iconByFileType(fileType)}
      <span className="ml-8pxr text-b3-md flex-grow text-black">{title} </span>
      <span className="text-cap2-rg text-gray-400">{formatLastOpened(lastOpened)}</span>
    </div>
  );
};

export default SearchResultCard;
