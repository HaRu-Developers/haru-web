'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Copy from '@svgs/component-set/CopyIcon.svg';
import Edit from '@svgs/component-set/EditIcon.svg';

import CategoryOption from '@common/components/CategoryOption/CategoryOption.client';
import IconButton from '@common/components/button/IconButton/IconButton.client';

import {
  AiMeetingAssistantLeftTabLabels,
  AiMeetingAssistantLeftTabType,
} from '@features/ai-meeting-assistant/constants/tabs';

import { useTabActions, useTabInfo } from '@features/ai-meeting-assistant/hooks/stores/useTabStore';

import { AiMeetingAssistantLeftTabProps } from './AiMeetingAssistantLeftTab.types';

const TABS = Object.values(AiMeetingAssistantLeftTabType);

const AiMeetingAssistantLeftTab = ({ current }: AiMeetingAssistantLeftTabProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const handleCopyClick = (tab: AiMeetingAssistantLeftTabType) => {
    console.log(`${tab} 복사 클릭`);
  };

  return (
    <div className="border-b-stroke-200 flex h-14 w-[720px] shrink-0 justify-between border-b border-solid bg-white px-5 py-[13px]">
      {/* 탭 영역 */}
      <div className="inline-flex gap-[9px]">
        {TABS.map((tab) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('leftTab', tab); // 현재 탭 값 설정

          return (
            <Link key={tab} href={`${pathname}?${params.toString()}`}>
              <CategoryOption
                label={AiMeetingAssistantLeftTabLabels[tab as AiMeetingAssistantLeftTabType]}
                active={current === tab}
              />
            </Link>
          );
        })}
      </div>

      {/* 버튼 영역 */}
      <div className="inline-flex items-center">
        {current === AiMeetingAssistantLeftTabType.AiNotes &&
          (isEditing ? (
            // TODO: 수정 완료 버튼으로 변경 필요
            <button onClick={handleEditDoneClick}>수정 완료</button>
          ) : (
            <>
              <IconButton onClick={handleEditClick} ariaLabel="회의록 수정">
                <Edit width="30px" height="30px" />
              </IconButton>
              <IconButton
                onClick={() => handleCopyClick(current)}
                ariaLabel={`${AiMeetingAssistantLeftTabLabels[current]} 복사`}
              >
                <Copy width="30px" height="30px" />
              </IconButton>
              {/* TODO: 다운로드 버튼으로 변경 필요 */}
              <button onClick={handleDownloadClick}>다운로드</button>
            </>
          ))}
        {current === AiMeetingAssistantLeftTabType.VoiceRecordings && (
          <IconButton
            onClick={handleDownloadClick}
            ariaLabel={`${AiMeetingAssistantLeftTabLabels[current]} 복사`}
          >
            <Copy width="30px" height="30px" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default AiMeetingAssistantLeftTab;
