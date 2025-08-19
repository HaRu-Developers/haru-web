'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { SnsEventAssistantObject } from '@api/sns-event-assistant/api.types';

import { SnsEventAssistantListType } from '@common/types/download.enum.types';
import { ToastType } from '@common/types/toast.types';

import { useToastActions } from '@common/hooks/stores/useToastStore';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import SnsBodyList from './SnsBodyList/SnsBodyList.client';
import SnsTopAction from './SnsTopAction/SnsTopAction.client';
import { useEditInfo } from '@features/ai-meeting-manager/hooks/stores/useEditStore';

interface SnsDetailMainProps {
  snsEventId?: string;
  sns?: SnsEventAssistantObject;
  onTitleSave?: (newTitle: string) => void;
}

const SnsDetailMain = ({
  snsEventId,
  sns,
  onTitleSave,
}: SnsDetailMainProps) => {
  const [mode, setMode] = useState<InputFileTitleMode>(InputFileTitleMode.DEFAULT);
  const type = useSearchParams().get('type') as SnsEventAssistantListType;
  const { addToast } = useToastActions();
  const { commitTick, cancelTick } = useEditInfo();

  const handleCopyClick = () => {
    addToast({
      text: '링크가 복사되었습니다.',
      type: ToastType.SUCCESS,
    });
  };

  const handleSaveTitle = (newTitle: string) => {
    onTitleSave?.(newTitle);
    setMode(InputFileTitleMode.DEFAULT);
  };

  return (
    <>
      {/* 상단 부분 */}
      <div className="border-b-stroke-200 flex w-full flex-col justify-center border-b border-solid bg-white">
        <div className="mx-auto mt-24pxr">
          <InputFileTitle
            value={sns?.title ?? ''}
            onSave={handleSaveTitle}
            mode={mode}
            onClick={() => setMode(InputFileTitleMode.EDITABLE)}
            onCancel={() => setMode(InputFileTitleMode.DEFAULT)}
            commitTick={commitTick}
            cancelTick={cancelTick}
          />
        </div>
        <div className="w-668pxr gap-16pxr mt-24pxr flex flex-col mx-auto">
          <FileCreatedInfo
            name={sns?.creatorName ?? ''}
            userId={sns?.creatorId ?? ''}
            dateTime={`${sns?.updatedAt}`}
          />
          <SnsTopAction
            workspaceId={sns?.workspaceId ?? ''}
            snsEventId={snsEventId ?? ''}
            onCopyClick={handleCopyClick}
            participantList={sns?.participantList}
            winnerList={sns?.winnerList}
            type={type}
          />
        </div>
      </div>
      {/* 하단 부분 */}
      <SnsBodyList
        link={sns?.snsLink}
        onCopyClick={handleCopyClick}
        participantList={sns?.participantList}
        winnerList={sns?.winnerList}
        title={sns?.title}
        type={type}
      />
    </>
  );
};

export default SnsDetailMain;
