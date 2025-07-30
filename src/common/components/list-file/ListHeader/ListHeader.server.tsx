/**
 * 리스트 컬럼명 부분
 */
import { ExtendedFileType, FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';

import { ListHeaderProps } from './ListHeader.types';

const ListHeader = ({ fileType }: ListHeaderProps) => {
  const getCtaDescription = (fileType: ExtendedFileType) => {
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        return <p>파일명</p>;
      case FileType.SNS_EVENT_ASSISTANT:
        return (
          <div className="flex items-center justify-between">
            <p>이벤트명</p>
            <div className="pr-32pxr gap-30pxr flex items-center">
              <p className="w-90pxr text-center">참여자 수</p>
              <p className="w-90pxr text-center">당첨자 수</p>
            </div>
          </div>
        );
      case FileType.TEAM_MOOD_TRACKER:
        return (
          <div className="flex items-center justify-between">
            <p>설문명</p>
            <div className="gap-30pxr pr-32pxr flex items-center">
              <p className="w-90pxr text-center">마감일</p>
              <p className="w-90pxr text-center">응답자 수</p>
            </div>
          </div>
        );
      case SNS_EVENT_ASSISTANT_LINK:
        return (
          <div className="flex items-center justify-between">
            <p>이벤트명</p>
            <p className="w-330pxr">SNS 링크</p>
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
