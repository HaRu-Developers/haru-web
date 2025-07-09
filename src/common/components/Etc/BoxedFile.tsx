import clsx from 'clsx';

import FeaturedFileIcons from '@icons/FeaturedFileIcons/FeaturedFileIcons';
import { FeaturedFileIconsState } from '@icons/FeaturedFileIcons/FeaturedFileIcons.types';

import { BoxedFileProps, DocumentType } from './BoxedFile.types';

const BoxedFile = ({
  title,
  lastOpened = new Date(Date.now()),
  thumbnailUrl,
  documentType,
}: BoxedFileProps) => {
  const today = new Date();
  const isSameDate =
    today.getFullYear() === lastOpened.getFullYear() &&
    today.getMonth() === lastOpened.getMonth() &&
    today.getDate() === lastOpened.getDate();
  const time = `${isSameDate ? `마지막으로 연 시간 ${lastOpened.toLocaleTimeString()}` : lastOpened.toLocaleDateString()}`;
  const iconClass = clsx('absolute top-[13px] left-[14px] h-[24px] w-[24px]');
  return (
    <div
      className={clsx(
        'h-[191px] w-[244px] flex-shrink-0 rounded-[16px] bg-gray-700 px-[20px] py-[17px]',
      )}
    >
      <div className={clsx('flex-shink-0 mb-[10px] flex w-full flex-col items-start gap-[2px]')}>
        {/* 폰트 시스템에 없어서 적용 안됨 양식만 맞줘 놓음 상태 */}
        <span className={clsx('text-t5-sb')}>{title}</span>
        <span className={clsx('text-cap2-rg text-gray-300')}>{time}</span>
      </div>
      {/* shadow box 나중에 수정 예정 */}
      <div
        className={clsx(
          'shadow-boxed-file relative h-[108px] w-full shrink-0 rounded-[10px] bg-white',
        )}
      >
        {documentType === DocumentType.AI_MEETING_MANAGER && (
          <FeaturedFileIcons
            state={FeaturedFileIconsState.SIZE_24_AI_MANAGER_FILE}
            className={clsx(iconClass)}
          />
        )}
        {documentType === DocumentType.SNS_EVENT_ASSISTANT && (
          <FeaturedFileIcons
            state={FeaturedFileIconsState.SIZE_24_SNS_ASSISTANT_FILE}
            className={clsx(iconClass)}
          />
        )}
        {documentType === DocumentType.TEAM_MOOD_TRACKER && (
          <FeaturedFileIcons
            state={FeaturedFileIconsState.SIZE_24_TEAM_MOOD_FILE}
            className={clsx(iconClass)}
          />
        )}

        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=""
            className={clsx('h-full w-full rounded-[10px] object-cover object-top pt-[40px]')}
          />
        ) : (
          <div className={clsx('flex flex-col gap-[4px] px-[14px] pt-[47px] pb-[13px]')}>
            <div className="h-[9px] rounded-[3px] bg-gray-600" />
            <div className="h-[9px] rounded-[3px] bg-gray-600" />
            <div className="h-[9px] rounded-[3px] bg-gray-600" />
            <div className="h-[9px] rounded-[3px] bg-gray-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxedFile;
