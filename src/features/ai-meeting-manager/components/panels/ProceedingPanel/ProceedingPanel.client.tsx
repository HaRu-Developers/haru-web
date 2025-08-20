'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useEditMeetingMinutesProceeding from '@api/meeting/patch/mutations/useEditMeetingMinutesProceeding';

import { equalIgnoringLineEndings } from '@common/utils/equal-ignoring-line-endings';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import ProceedingDoc from './ProceedingDoc/ProceedingDoc.client';
import ProceedingDocSkeleton from './ProceedingDoc/ProceedingDocSkeleton.client';
import ProceedingEditor from './ProceedingEditor/ProceedingEditor.client';
import { ProceedingPanelProps } from './ProceedingPanel.types';
import { parseProceeding } from './ProceedingPanel.utils';

const ProceedingPanel = ({ editingScopeRef }: ProceedingPanelProps) => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);
  const serverContent = meetingMinutesDetail?.proceeding ?? '';

  // 전역 편집/커밋/취소 tick 구독
  const { editing, commitTick, cancelTick } = useEditInfo();
  const { setEditing } = useEditActions();
  const isEditing = editing[EditorType.PROCEEDING];

  const { mutate: saveProceeding, isPending } = useEditMeetingMinutesProceeding(meetingId);

  // 뷰 모드에서 사용할 섹션(고정 렌더)
  const sections = useMemo(() => parseProceeding(serverContent), [serverContent]);

  // draft(raw) 관리
  const [draft, setDraft] = useState(serverContent);
  useEffect(() => {
    if (!isEditing) setDraft(serverContent);
  }, [serverContent, isEditing]);

  // commit/cancel tick 구독
  // const lastActionRef = useRef<'none' | 'save' | 'cancel'>('none');
  const prevCommitRef = useRef(commitTick);
  const prevCancelRef = useRef(cancelTick);

  // 저장 로직 (origin: commit | auto)
  const doSave = useCallback(() => {
    if (isPending || !isEditing) return;

    const hasChanges = !equalIgnoringLineEndings(draft, serverContent);
    if (!hasChanges) {
      setEditing(EditorType.PROCEEDING, false);
      return;
    }

    setEditing(EditorType.PROCEEDING, false);
    saveProceeding({ meetingId, proceeding: draft });
  }, [draft, serverContent, isEditing, isPending, setEditing, saveProceeding, meetingId]);

  const doCancel = useCallback(() => {
    setDraft(serverContent);
    setEditing(EditorType.PROCEEDING, false);
  }, [serverContent, setEditing]);

  // commitTick 증가에만 반응
  useEffect(() => {
    if (!isEditing) {
      prevCommitRef.current = commitTick;
      return;
    }
    if (commitTick === prevCommitRef.current) return; // 변화 없으면 스킵
    prevCommitRef.current = commitTick;

    doSave();
  }, [commitTick, isEditing, doSave]);

  // cancelTick 증가에만 반응
  useEffect(() => {
    if (!isEditing) {
      prevCancelRef.current = cancelTick;
      return;
    }
    if (cancelTick === prevCancelRef.current) return;
    prevCancelRef.current = cancelTick;

    doCancel();
  }, [cancelTick, isEditing, doCancel]);

  // 에디터에서 변경 시 draft 갱신
  const handleEditorChange = useCallback((raw: string) => {
    setDraft(raw);
  }, []);

  return (
    <section className="px-32pxr py-12pxr flex w-full shrink-0 items-start">
      {isEditing ? (
        <ProceedingEditor
          value={draft}
          onChange={(raw) => handleEditorChange(raw)}
          editingScopeRef={editingScopeRef}
          disabled={isPending}
        />
      ) : isFetching ? (
        <ProceedingDocSkeleton />
      ) : (
        <ProceedingDoc sections={sections} />
      )}
    </section>
  );
};

export default ProceedingPanel;
