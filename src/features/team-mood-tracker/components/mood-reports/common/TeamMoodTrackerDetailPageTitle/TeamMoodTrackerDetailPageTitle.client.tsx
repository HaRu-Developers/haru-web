'use client';

import { useCallback } from 'react';

import { SurveyBaseInfoResponseDto } from '@api/team-mood-tracker/apis.types';
import { useModifyMoodTrackerTitleMutation } from '@api/team-mood-tracker/post/mutations/useModifyTitleMutation';

import InputFileTitle from '@common/components/inputs/InputFileTitle/InputFileTitle.client';
import { InputFileTitleMode } from '@common/components/inputs/InputFileTitle/InputFileTitle.types';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

interface TeamMoodTrackerDetailPageTitleProps {
  moodTrackerHashedId: string;
  surveyBasicInfo: SurveyBaseInfoResponseDto;
}

const TeamMoodTrackerDetailPageTitle = ({
  moodTrackerHashedId,
  surveyBasicInfo,
}: TeamMoodTrackerDetailPageTitleProps) => {
  const { editing, commitTick, cancelTick } = useEditInfo();
  const { setEditing } = useEditActions();

  const inputFileTitleMode = editing[EditorType.TITLE]
    ? InputFileTitleMode.EDITABLE
    : InputFileTitleMode.DEFAULT;

  /**
   * 파일 제목을 변경하는 useMutation
   */
  const { mutate: modifyTitle, isPending: isModifyTitleRequestPending } =
    useModifyMoodTrackerTitleMutation();

  const handleTitleSave = useCallback(
    (newTitle: string) => {
      if (isModifyTitleRequestPending) return;
      // newTitle이 빈 문자열이거나, surveyBasicInfo가 없거나, 기존 제목과 동일한 경우
      if (!newTitle.trim() || !surveyBasicInfo || newTitle === surveyBasicInfo.title) {
        setEditing(EditorType.TITLE, false);
        return;
      }
      setEditing(EditorType.TITLE, false);
      modifyTitle({
        moodTrackerHashedId,
        title: newTitle.trim(),
      });
    },
    [isModifyTitleRequestPending, setEditing, modifyTitle, moodTrackerHashedId, surveyBasicInfo],
  );

  const handleTitleCancel = useCallback(() => {
    setEditing(EditorType.TITLE, false);
  }, [setEditing]);

  const handleTitleClick = useCallback(() => {
    setEditing(EditorType.TITLE, true);
  }, [setEditing]);

  return (
    <div className="mb-14pxr">
      <InputFileTitle
        value={surveyBasicInfo.title}
        isLoading={isModifyTitleRequestPending}
        mode={inputFileTitleMode}
        onSave={handleTitleSave}
        onCancel={handleTitleCancel}
        onClick={handleTitleClick}
        commitTick={commitTick}
        cancelTick={cancelTick}
      />
    </div>
  );
};

export default TeamMoodTrackerDetailPageTitle;
