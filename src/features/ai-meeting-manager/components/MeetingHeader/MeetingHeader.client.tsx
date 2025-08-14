'use client';

import { useCallback } from 'react';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useEditMeetingMinutesTitle from '@api/meeting/patch/queries/useEditMeetingMinutesTitle';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import { ImageSize } from '@common/components/images/types/images.common.types';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import { useTabActions, useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

import { MeetingHeaderProps } from './MeetingHeader.types';

const MeetingHeader = ({ editingScopeRef }: MeetingHeaderProps) => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);
  const { mutate: editMeetingMinutesTitle, isPending } = useEditMeetingMinutesTitle(meetingId);
  const { isEditing } = useTabInfo();
  const { setEditing } = useTabActions();

  const title = meetingMinutesDetail?.title?.trim() || '제목 없음';
  const userId = meetingMinutesDetail?.userId ?? '';
  const userName = meetingMinutesDetail?.userName ?? '작성자 없음';
  const updatedAt = meetingMinutesDetail?.updatedAt ?? '';

  const inputFileTitleMode = isEditing ? InputFileTitleMode.EDITABLE : InputFileTitleMode.DEFAULT;
  const handleSaveTitle = useCallback(
    (inputValue: string) => {
      // 이전 값이랑 같으면 무시
      const next = inputValue.trim();
      if (next === title) {
        setEditing(false);
        return;
      }
      setEditing(false);
      editMeetingMinutesTitle({ meetingId, title: next });
    },
    [editMeetingMinutesTitle, meetingId, title, setEditing],
  );

  const handleCancel = useCallback(() => {
    setEditing(false);
  }, [setEditing]);

  const isLoading = isFetching || isPending;

  return (
    <h2 className="pt-24pxr px-32pxr gap-y-16pxr flex h-[var(--meeting-header-height)] w-full flex-col">
      <InputFileTitle
        isLoading={isLoading}
        value={title}
        noPadding
        mode={inputFileTitleMode}
        onCancel={handleCancel}
        onSave={handleSaveTitle}
        editingScopeRef={editingScopeRef}
      />
      <FileCreatedInfo
        isLoading={isLoading}
        name={userName}
        userId={userId}
        dateTime={updatedAt}
        profileSize={ImageSize.SMALL}
      />
    </h2>
  );
};

export default MeetingHeader;
