'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useEditMeetingMinutesProceeding from '@api/meeting/patch/queries/useEditMeetingMinutesProceeding';

import { equalIgnoringLineEndings } from '@common/utils/equal-ignoring-line-endings';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import MarkdownContentForProceeding from '@features/ai-meeting-manager/components/MarkdownContentForProceeding/MarkdownContentForProceeding.client';
import MarkdownContentForProceedingSkeleton from '@features/ai-meeting-manager/components/MarkdownContentForProceeding/MarkdownContentForProceedingSkeleton.client';

import { ProceedingPanelProps } from './ProceedingPanel.types';

const ProceedingPanel = ({ editingScopeRef }: ProceedingPanelProps) => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: meetingMinutesDetail, isFetching } = useFetchMeetingMinutesDetail(meetingId);
  const serverContent = meetingMinutesDetail?.proceeding ?? '';

  // 전역 편집/커밋/취소 tick 구독
  const { editing, commitTick, cancelTick } = useEditInfo();
  const { setEditing } = useEditActions();
  const isEditing = editing[EditorType.PROCEEDING];

  const { mutate: saveProceeding, isPending } = useEditMeetingMinutesProceeding(meetingId);

  const [draft, setDraft] = useState(serverContent);

  const lastActionRef = useRef<'none' | 'save' | 'cancel'>('none');
  const prevCommitRef = useRef(commitTick);
  const prevCancelRef = useRef(cancelTick);

  // 서버 값 → draft 동기화 (편집 중이 아닐 때만)
  useEffect(() => {
    if (!isEditing) setDraft(serverContent);
  }, [serverContent, isEditing]);

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

  // 키 바인딩: Shift+Enter만 줄바꿈 허용 / Enter 저장 / Esc 취소
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // IME 조합 중이면 Enter 무시
    if (e.nativeEvent?.isComposing) return;

    if (e.key === 'Enter') {
      if (e.shiftKey) return; // 줄바꿈 허용
      // Enter(또는 Cmd/Ctrl+Enter) → 저장
      e.preventDefault();
      lastActionRef.current = 'save';
      (e.currentTarget as HTMLTextAreaElement).blur(); // blur에서 auto 저장 경로
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      lastActionRef.current = 'cancel';
      (e.currentTarget as HTMLTextAreaElement).blur();
    }
  };

  // blur: 커밋 진행 중이면 무시 (중복 방지)
  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // 같은 편집 스코프 내부 이동은 무시
    const next = e.relatedTarget as Node | null;
    if (next && editingScopeRef?.current?.contains(next)) return;

    if (lastActionRef.current === 'save') {
      doSave();
    } else if (lastActionRef.current === 'cancel') {
      doCancel();
    } else {
      // 바깥 클릭 자동 저장
      doSave();
    }
    lastActionRef.current = 'none';
  };

  return (
    <section className="px-32pxr py-12pxr flex w-full shrink-0 items-start">
      {isEditing ? (
        <div className="max-w-1096pxr w-full">
          <textarea
            className="scrollbar-page rounded-6pxr text-b2-rg focus:border-stroke-selected min-h-300pxr w-full resize-none border border-gray-400 bg-white p-3 text-black outline-none focus:border-2"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            placeholder="마크다운으로 회의 진행 내용을 작성하세요"
            disabled={isPending}
          />
        </div>
      ) : isFetching ? (
        <MarkdownContentForProceedingSkeleton />
      ) : (
        <MarkdownContentForProceeding content={serverContent} />
      )}
    </section>
  );
};

export default ProceedingPanel;
