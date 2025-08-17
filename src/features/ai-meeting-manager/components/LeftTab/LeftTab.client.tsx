'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import EditCompleteButton from '@buttons/30px/EditCompleteButton/EditCompleteButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import { LeftTabLabels } from './LeftTab.constants';
import { LeftTabProps, LeftTabType } from './LeftTab.types';

const tabs = Object.values(LeftTabType);

const LeftTab = ({ current }: LeftTabProps) => {
  const pathname = usePathname() ?? '';

  const { editing } = useEditInfo();
  const { setEditing, requestCommit, resetEditing } = useEditActions();

  const handleEditClick = () => {
    setEditing(EditorType.TITLE, true);
    setEditing(EditorType.PROCEEDING, true);
  };

  const handleEditDoneClick = () => {
    // 여기선 저장을 ‘요청’만
    // 실제 저장은 MeetingHeader의 InputFileTitle, ProceedingPanel이 수행
    requestCommit();
  };

  const handleDownloadClick = () => {
    console.log('다운로드 클릭');
  };

  const handleCopyClick = (tab: LeftTabType) => {
    console.log(`${tab} 탭에서 복사 클릭`);
  };

  return (
    <div className="border-stroke-200 px-33pxr flex h-[var(--tab-height)] w-full shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex items-center">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('leftTab', tab); // 현재 탭 값 설정
          const isActive = current === tab;

          return (
            <Link
              key={tab}
              href={`${pathname}?${params.toString()}`}
              onClick={() => {
                if (!isActive) resetEditing();
              }}
              passHref
            >
              <CategoryOption label={LeftTabLabels[tab as LeftTabType]} active={isActive} />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      <div className="gap-12pxr inline-flex items-center">
        {current === LeftTabType.MEETING_PROCEEDING &&
          (editing[EditorType.TITLE] || editing[EditorType.PROCEEDING] ? (
            <EditCompleteButton onClick={handleEditDoneClick} />
          ) : (
            <>
              <div className="inline-flex">
                <IconButton onClick={handleEditClick} ariaLabel="회의록 수정">
                  <FeatureTabIcons state={FeatureTabIconsState.EDIT} />
                </IconButton>
                <IconButton
                  onClick={() => handleCopyClick(current)}
                  ariaLabel={`${LeftTabLabels[current]} 복사`}
                >
                  <FeatureTabIcons state={FeatureTabIconsState.COPY} />
                </IconButton>
              </div>
              <DownloadButton onClick={handleDownloadClick} />
            </>
          ))}
        {current === LeftTabType.MEETING_VOICE_LOG && (
          <IconButton
            onClick={() => handleCopyClick(current)}
            ariaLabel={`${LeftTabLabels[current]} 복사`}
          >
            <FeatureTabIcons state={FeatureTabIconsState.COPY} />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default LeftTab;
