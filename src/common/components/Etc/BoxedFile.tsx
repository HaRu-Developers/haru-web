import clsx from 'clsx';

import AiManager from '@common/svgs/component-set/AiManagerIcon.svg';
import SnsAssist from '@common/svgs/component-set/SnsAssistIcon.svg';
import TeamMood from '@common/svgs/component-set/TeamMoodIcon.svg';

import { BoxedFileProps } from './BoxedFile.types';

const BoxedFile = ({
  createdAt = new Date(Date.now()),
  lastOpenedAt = new Date(Date.now()),
  fileImageUrl,
  fileType,
}: BoxedFileProps) => {
  const today = new Date();
  const isSameDate =
    today.getFullYear() === lastOpenedAt.getFullYear() &&
    today.getMonth() === lastOpenedAt.getMonth() &&
    today.getDate() === lastOpenedAt.getDate();
  const title = `${new Date().getFullYear() === createdAt.getFullYear() ? '' : createdAt.getFullYear() + '년'} ${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일 회의록`;
  const time = `마지막으로 연 시간 ${isSameDate ? '' : lastOpenedAt.toLocaleDateString()} ${lastOpenedAt.toLocaleTimeString()}`;
  const iconClass = clsx('absolute top-[13px] left-[14px] h-[24px] w-[24px]');
  return (
    <div
      className={clsx(
        'h-[191px] w-[244px] flex-shrink-0 rounded-[16px] bg-gray-700 px-[20px] py-[17px]',
      )}
    >
      <div className={clsx('flex-shink-0 mb-[10px] flex w-full flex-col items-start gap-[2px]')}>
        <span className={clsx('text-title-5 font-semibold')}>{title}</span>
        <span className={clsx('text-caption-2 text-gray-300')}>{time}</span>
      </div>
      <div
        className={clsx(
          'shadow-boxed-file relative h-[108px] w-full shrink-0 rounded-[10px] bg-white',
        )}
      >
        {fileType === 'AI_MANAGER' && <AiManager className={iconClass} />}
        {fileType === 'SNS_ASSIST' && <SnsAssist className={iconClass} />}
        {fileType === 'TEAM_MOOD' && <TeamMood className={iconClass} />}

        {fileImageUrl ? (
          <img
            src={fileImageUrl}
            alt=""
            className={clsx('h-full w-full rounded-[10px] object-cover')}
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
