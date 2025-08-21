import { ExtendedFileType, FileType, SNS_EVENT_ASSISTANT_LINK } from '@common/types/file-type.enum';

import AIMeetingManagerListHeaderContent from './AIMeetingManagerListHeaderContent.client';
import { ListHeaderProps } from './ListHeader.types';

/**
 * 리스트 컬럼명 부분
 */
const ListHeader = ({ fileType }: ListHeaderProps) => {
  // TODO: 이건 뭐에요?

  const getCtaDescription = (fileType: ExtendedFileType) => {
    switch (fileType) {
      case FileType.AI_MEETING_MANAGER:
        return <AIMeetingManagerListHeaderContent />;
      case FileType.SNS_EVENT_ASSISTANT:
        return (
          <h4 className="text-cap1-md flex items-center justify-between text-[#A0A0A0]">
            <p>이벤트명</p>
            <div className="pr-32pxr gap-30pxr flex items-center">
              <p className="w-90pxr text-center">참여자 수</p>
              <p className="w-90pxr text-center">당첨자 수</p>
            </div>
          </h4>
        );
      case FileType.TEAM_MOOD_TRACKER:
        return (
          <h4 className="text-cap1-md flex items-center justify-between text-[#A0A0A0]">
            <p>설문명</p>
            <div className="gap-30pxr pr-32pxr flex items-center">
              <p className="w-90pxr text-center">마감일</p>
              <p className="w-90pxr text-center">응답자 수</p>
            </div>
          </h4>
        );
      case SNS_EVENT_ASSISTANT_LINK:
        return (
          <h4 className="text-cap1-md flex items-center justify-between text-[#A0A0A0]">
            <p>이벤트명</p>
            <p className="w-330pxr">SNS 링크</p>
          </h4>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {getCtaDescription(fileType)}
      <div className="mt-8pxr mb-9pxr h-1pxr w-full bg-[#E6E9EF]"></div>
    </div>
  );
};

export default ListHeader;
