/**
 * 리스트 컬럼명 부분
 */
import { FileType } from '@common/types/file-type.enum';

import { ListHeaderProps } from './ListHeader.types';

const ListHeader = ({ fileType }: ListHeaderProps) => {
  const getCtaDescription = (fileType: FileType) => {
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        return <p>파일명</p>;
      case FileType.SNS_EVENT_ASSISTANT:
        return (
          <div className="flex items-center justify-between">
            <p>이벤트명</p>
            <div className="gap-100pxr flex items-center">
              <p>참여자 수</p>
              <p>당첨자 수</p>
            </div>
          </div>
        );
      case FileType.TEAM_MOOD_TRACKER:
        return (
          <div className="flex items-center justify-between">
            <p>설문명</p>
            <div className="gap-100pxr flex items-center">
              <p>마감일</p>
              <p>응답자 수</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full">
      <h4 className="text-cap1-md text-[#A0A0A0]">{getCtaDescription(fileType)}</h4>
      <div className="mt-8pxr mb-9pxr h-1pxr w-full bg-[#E6E9EF]"></div>
    </div>
  );
};

export default ListHeader;
