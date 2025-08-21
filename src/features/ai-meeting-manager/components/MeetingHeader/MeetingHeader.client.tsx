'use client';

import { useCallback } from 'react';

import { useParams, useSearchParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useEditMeetingMinutesTitle from '@api/meeting/patch/mutations/useEditMeetingMinutesTitle';

import FileCreatedInfo from '@common/components/FileCreatedInfo/FileCreatedInfo.client';
import { ImageSize } from '@common/components/images/types/images.common.types';
import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import { LeftTabType } from '../LeftTab/LeftTab.types';
import { MeetingHeaderProps } from './MeetingHeader.types';

const MeetingHeader = ({ editingScopeRef }: MeetingHeaderProps) => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const searchParams = useSearchParams();
  const leftTab = searchParams.get('leftTab');
  const isVoiceLogTab = leftTab === LeftTabType.MEETING_VOICE_LOG;
  const isProceedingTab = leftTab === LeftTabType.MEETING_PROCEEDING;

  const { extra: meetingMinutesDetail, isLoading } = useFetchMeetingMinutesDetail(meetingId);
  const { mutate: editMeetingMinutesTitle, isPending } = useEditMeetingMinutesTitle(meetingId);
  const { editing, commitTick, cancelTick } = useEditInfo();
  const { setEditing } = useEditActions();

  const title = meetingMinutesDetail?.title ?? '';
  const userId = meetingMinutesDetail?.userId ?? '';
  const userName = meetingMinutesDetail?.userName ?? '';
  const updatedAt = meetingMinutesDetail?.updatedAt ?? '';

  const inputFileTitleMode = editing[EditorType.TITLE]
    ? InputFileTitleMode.EDITABLE
    : InputFileTitleMode.DEFAULT;

  const onSave = useCallback(
    (next: string) => {
      if (isPending) return;
      // console.log('InputFileTitle enter 눌렀을때 ', editing[EditorType.TITLE]);
      setEditing(EditorType.TITLE, false);
      editMeetingMinutesTitle({ meetingId, title: next.trim() });
    },
    [isPending, setEditing, editMeetingMinutesTitle, meetingId],
  );

  const onCancel = useCallback(() => {
    setEditing(EditorType.TITLE, false);
  }, [setEditing]);

  // 음성 기록 탭일때 제목 클릭시 수정모드
  const onClick = useCallback(() => {
    if (isVoiceLogTab) setEditing(EditorType.TITLE, true);
  }, [isVoiceLogTab, setEditing]);

  return (
    <h2 className="pt-24pxr px-32pxr gap-y-16pxr flex h-[var(--meeting-header-height)] w-full flex-col">
      <InputFileTitle
        isLoading={isLoading}
        value={title}
        mode={inputFileTitleMode}
        onCancel={onCancel}
        onSave={onSave}
        editingScopeRef={editingScopeRef}
        onClick={onClick}
        commitTick={commitTick}
        cancelTick={cancelTick}
        isProceedingTab={isProceedingTab}
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
