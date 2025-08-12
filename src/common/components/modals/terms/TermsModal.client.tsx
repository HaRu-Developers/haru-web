'use client';

import clsx from 'clsx';

import CrossIcons from '@icons/CrossIcons/CrossIcons';
import { CrossIconsState } from '@icons/CrossIcons/CrossIcons.types';

import MarkdownContentForModal from '@common/components/mark-down-content/MarkdownContentForModal/MarkdownContentForTeamMoodTracker.server';

import CommonText from '../CommonText/CommonText.server';
import { CommonTextType } from '../CommonText/CommonText.types';
import { TermsModalProps } from './TermsModal.types';

const TermsModal = ({ onClose, terms }: TermsModalProps) => {
  // TODO: API 연결로 변경

  return (
    <div
      className={clsx(
        'w-1020pxr px-50pxr pt-42pxr rounded-16pxr shadow-modal relative flex flex-col items-center justify-center bg-white',
        {
          'h-760pxr': terms.title !== '마케팅정보수신',
          'h-519pxr': terms.title === '마케팅정보수신',
        },
      )}
    >
      {/* 모달 제목 + 닫기 버튼 */}
      <div className="h-32pxr flex w-full items-center justify-between">
        <CommonText type={CommonTextType.T2_BD_BLACK} text={terms.title} />
        <button className="mr-2pxr" onClick={onClose}>
          <CrossIcons state={CrossIconsState.SIZE_20_GRAY_200} />
        </button>
      </div>

      {/* 구분선 */}
      <div className="bg-stroke-100 my-16pxr h-1 w-full"></div>

      {/* 약관 내용 */}
      <div className="mt-16pxr scrollbar-component w-full flex-grow overflow-y-auto">
        {/* TODO: 임시로 padding bottom을 통해서 blur 효과 탈출 ..
         scrollbar도 끝까지 가있고, blur 당하는게 보기 싫은 관계로 해결 필요 */}
        <div className="text-b3-rg scrollbar-component h-full w-full overflow-y-auto pb-16 whitespace-pre-line text-black">
          <MarkdownContentForModal content={terms.content} />
        </div>
      </div>
      {/* 하단 blur 효과 */}
      <div className="rounded-b-16pxr h-47pxr pointer-events-none absolute right-0 bottom-0 left-0 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default TermsModal;
