'use client';

import { useEffect } from 'react';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';

import {
  useEditActions,
  useEditInfo,
} from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import { EditKeyMapProps } from './EditKeyMap.types';

/**
 * “키보드 입력 → 저장/취소 의도”를 표준화하는 컨트롤러
 *
 * 스코프 안에서 Enter/Escape 같은 키 입력을 가로채서 저장(commit)/취소(cancel) ‘의도’만 브로드캐스트하고,
 * 실제 저장/취소는 각 컴포넌트(제목 인풋, 본문 textarea)가 commitTick/cancelTick 변화를 감지해 실행함
 */
const EditKeymap = ({ editingScopeRef }: EditKeyMapProps) => {
  const { editing } = useEditInfo();
  const { requestCommit, requestCancel } = useEditActions();
  const anyEditing = editing[EditorType.TITLE] || editing[EditorType.PROCEEDING];

  useEffect(() => {
    const el = editingScopeRef.current;
    if (!el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      // 편집 중이 아니면 무시
      if (!anyEditing) return;

      // Shift+Enter는 줄바꿈 허용
      // Enter (또는 Ctrl/Cmd+Enter)는 저장에 사용
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || !e.shiftKey)) {
        e.preventDefault();
        requestCommit(); // 저장 신호 증가
      } else if (e.key === 'Escape') {
        e.preventDefault();
        requestCancel(); // 취소 신호 증가
      }
    };

    // editingScopeRef.current에 keydown 리스너를 캡처 단계(true) 로 붙여서
    // 그 안의 모든 자식 입력(제목/본문)에서 발생하는 키를 한 곳에서 받음
    el.addEventListener('keydown', onKeyDown, true);
    return () => el.removeEventListener('keydown', onKeyDown, true);
  }, [editingScopeRef, anyEditing, requestCommit, requestCancel]);

  return null;
};

export default EditKeymap;
