'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import FeatureTabIcons from '@icons/FeatureTabIcons/FeatureTabIcons';
import { FeatureTabIconsState } from '@icons/FeatureTabIcons/FeatureTabIcons.types';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';

import DownloadButton from '@buttons/30px/DownloadButton/DownloadButton.client';
import EditCompleteButton from '@buttons/30px/EditCompleteButton/EditCompleteButton.client';
import IconButton from '@buttons/IconButton/IconButton.client';

import { useTabActions, useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

import { LeftTabLabels } from './LeftTab.constants';
import { LeftTabProps, LeftTabType } from './LeftTab.types';

const tabs = Object.values(LeftTabType);

const LeftTab = ({ current }: LeftTabProps) => {
  const pathname = usePathname() ?? '';

  const { isEditing } = useTabInfo();
  const { setEditing } = useTabActions();

  const handleEditClick = () => {
    console.log('수정 클릭');
    setEditing(true);
  };

  const handleEditDoneClick = () => {
    console.log('수정 완료 클릭');
    setEditing(false);
  };

  const handleDownloadClick = () => {
    console.log('다운로드 클릭');
  };

  const handleCopyClick = (tab: LeftTabType) => {
    console.log(`${tab} 탭에서 복사 클릭`);
  };

  return (
    <div className="border-stroke-200 w-720pxr py-13pxr px-32pxr flex h-14 shrink-0 items-center justify-between border-b border-solid bg-white">
      {/* 탭 영역 */}
      <div className="gap-9pxr inline-flex items-center">
        {tabs.map((tab) => {
          const params = new URLSearchParams();
          params.set('leftTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption label={LeftTabLabels[tab as LeftTabType]} active={current === tab} />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      <div className="gap-12pxr inline-flex items-center">
        {current === LeftTabType.MEETING_SUMMARY &&
          (isEditing ? (
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
