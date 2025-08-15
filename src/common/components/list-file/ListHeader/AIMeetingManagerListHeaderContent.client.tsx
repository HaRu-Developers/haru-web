'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import IndividualIcons from '@icons/IndividualIcons/IndividualIcons';
import { IndividualIconsState } from '@icons/IndividualIcons/IndividualIcons.types';

import { ROUTES } from '@common/constants/routes.constants';

import { useListInfo } from '@features/ai-meeting-manager/hooks/stores/useListStore';

/**
 * ai-meeting-manager에 쓰이는 헤더
 *
 * isAnyChecked면 지우기 버튼, 아니면 '파일명'
 */
const AIMeetingManagerListHeaderContent = () => {
  const { isAnyChecked } = useListInfo();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const href = `${ROUTES.MODAL.AI_MEETING_MANAGER.CONFIRM_DELETE(workspaceId)}`;

  return isAnyChecked ? (
    <Link
      href={href}
      className="gap-2pxr rounded-7pxr py-5pxr pl-8pxr pr-10pxr inline-flex items-center hover:bg-gray-600"
    >
      <IndividualIcons state={IndividualIconsState.TRASH_OUTLINE} />
      <p className="text-system-red text-bt3-sb">지우기</p>
    </Link>
  ) : (
    <h4 className="text-cap1-md text-[#A0A0A0]">파일명</h4>
  );
};

export default AIMeetingManagerListHeaderContent;
