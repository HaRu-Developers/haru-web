import clsx from 'clsx';

import AiQuestionIcons from '@icons/AiQuestionIcons/AiQuestionIcons';
import { AiQuestionIconsState } from '@icons/AiQuestionIcons/AiQuestionIcons.types';
import SpeakerIcons from '@icons/SpeakerIcons/SpeakerIcons';
import { SpeakerIconsState } from '@icons/SpeakerIcons/SpeakerIcons.types';

import { UtteranceItemProps } from './UtteranceItem.types';

const UtteranceItem = ({ hasRecommandation }: UtteranceItemProps) => {
  return (
    <div
      className={clsx(
        'group/utt py-12pxr w-full cursor-pointer',
        hasRecommandation ? 'pl-32pxr' : 'px-32pxr',
      )}
    >
      <div className="gap-x-12pxr flex">
        <SpeakerIcons state={SpeakerIconsState.USER_1} className="cursor-default" />
        <div>
          <div className="gap-x-10pxr py-5pxr flex cursor-default items-center">
            <p className="text-t5-sb text-black">발화자1</p>
            <p className="text-b4-rg text-gray-400">8:32</p>
          </div>
          <div className={clsx('flex', { 'gap-x-14pxr': hasRecommandation })}>
            <p className="text-b3-rg whitespace-pre-wrap text-black">
              그럼 회비는 인당 25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅시다. 그럼 회비는
              인당25,000원으로 가정하고, 예산 구조를 항목별로 나눠봅시다.
            </p>
            {hasRecommandation && (
              <div className="shrink-0">
                {/* 기본 아이콘 */}
                <AiQuestionIcons
                  state={AiQuestionIconsState.SIZE_18}
                  className="block transition-opacity group-hover/utt:hidden"
                />
                {/* 호버 아이콘 */}
                <AiQuestionIcons
                  state={AiQuestionIconsState.SIZE_20_HOVER}
                  className="hidden transition-opacity group-hover/utt:block"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtteranceItem;
