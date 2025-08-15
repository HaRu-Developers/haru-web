'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import useFetchMeetingMinutesDetail from '@api/meeting/get/queries/useFetchMeetingMinutesDetail';
import useEditMeetingMinutesProceeding from '@api/meeting/patch/queries/useEditMeetingMinutesProceeding';

import { useTabActions, useTabInfo } from '@features/ai-meeting-manager/hooks/stores/useTabStore';

import MarkdownContentForProceeding from '@features/ai-meeting-manager/components/MarkdownContentForProceeding/MarkdownContentForProceeding.client';

import { ProceedingPanelProps } from './ProceedingPanel.types';

const ProceedingPanel = ({ editingScopeRef }: ProceedingPanelProps) => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { extra: detail, isFetching } = useFetchMeetingMinutesDetail(meetingId);
  const serverContent = detail?.proceeding ?? '';

  const { isEditing } = useTabInfo();
  const { setEditing } = useTabActions();

  const { mutate: saveProceeding, isPending } = useEditMeetingMinutesProceeding(meetingId);

  const isLoading = isFetching || isPending;
  const [draft, setDraft] = useState(serverContent);
  const lastActionRef = useRef<'none' | 'save' | 'cancel'>('none');

  // 서버 값이 바뀌면 에디터에 반영
  useEffect(() => {
    setDraft(serverContent);
  }, [serverContent]);

  const doSave = useCallback(() => {
    lastActionRef.current = 'save';
    saveProceeding({ meetingId, proceeding: draft });
    setEditing(false);
  }, [draft, meetingId, saveProceeding, setEditing]);

  const doCancel = useCallback(() => {
    lastActionRef.current = 'cancel';
    setDraft(serverContent); // 되돌리기
    setEditing(false);
  }, [serverContent, setEditing]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter → 저장
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (normalize(draft) !== normalize(serverContent)) doSave();
    }
    // Esc → 취소
    if (e.key === 'Escape') {
      e.preventDefault();
      doCancel();
    }
  };

  const normalize = (s: string) => s.replace(/\r\n/g, '\n'); // CRLF ↔ LF 차이 무시

  const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter / Esc 직후 blur는 무시
    // 키보드 누른 직후에는 blur가 “부수 효과”로 반드시 발생하는데, 그때 onBlur에서 또 저장을 걸면 중복 저장/모순 동작함. 그거 방지
    if (lastActionRef.current !== 'none') {
      lastActionRef.current = 'none';
      return;
    }

    // 포커스가 같은 편집 스코프 안으로 이동하면 저장하지 않음 - 제목 수정시
    const next = e.relatedTarget as Node | null;
    if (next && editingScopeRef?.current?.contains(next)) return;

    // 진행 중이면(중복 요청 방지) 저장하지 않음
    if (isLoading) return;

    // 내용이 실제로 바뀌지 않았으면 저장하지 않음
    const changed = normalize(draft) !== normalize(serverContent);
    if (!changed) return;

    // 5) 여기까지 왔으면 저장
    doSave();
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
            disabled={isLoading}
          />
        </div>
      ) : (
        <MarkdownContentForProceeding content={serverContent} />
      )}
    </section>
  );
};

export default ProceedingPanel;
