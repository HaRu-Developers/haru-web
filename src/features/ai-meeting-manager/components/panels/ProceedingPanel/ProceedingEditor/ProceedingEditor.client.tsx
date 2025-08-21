'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { EditorType } from '@features/ai-meeting-manager/types/edit.types';
import type { ProceedingSection } from '@features/ai-meeting-manager/types/proceeding.types';

import { useEditActions } from '@features/ai-meeting-manager/hooks/stores/useEditStore';

import {
  createLastEnterTracker,
  enterKeyForItem,
  isAtHead,
  isAtTail,
  isLastItem,
  keyOfItem,
  keyOfTitle,
  normalizeSections,
  parseProceeding,
  stringifyProceeding,
} from '../ProceedingPanel.utils';
import { ProceedingEditorProps } from './ProceedingEditor.types';

const ProceedingEditor = ({
  value,
  onChange,
  editingScopeRef,
  disabled,
}: ProceedingEditorProps) => {
  const { setEditing } = useEditActions();
  // 서버에서 준 문자열을 객체로 변환해 저장하기 - 동기화
  // 내부 상태: 항상 최소 1 섹션, 섹션당 최소 1 불렛 보장
  const [sections, setSections] = useState<ProceedingSection[]>(() => parseProceeding(value));
  useEffect(() => {
    setSections(parseProceeding(value));
  }, [value]);

  const emit = useCallback(
    (next: ProceedingSection[]) => {
      const norm = normalizeSections(next);
      onChange?.(stringifyProceeding(norm), norm);
    },
    [onChange],
  );

  //  sections 커밋 후에만 부모 onChange 호출
  useEffect(() => {
    if (!pendingEmitRef.current) return; // 외부(value) 동기화로 바뀐 경우는 무시
    pendingEmitRef.current = false;
    emit(sections);
  }, [sections, emit]);

  const pendingEmitRef = useRef(false); // 내부 변경 플래그

  // 입력 DOM ref 저장소
  const refs = useRef<Map<string, HTMLInputElement | null>>(new Map());
  const setRef = (key: string) => (el: HTMLInputElement | null) => {
    refs.current.set(key, el);
  };

  // focus 유틸
  const focus = useCallback((key: string, toEnd = true) => {
    const el = refs.current.get(key);
    if (!el) return;
    el.focus();
    if (toEnd) {
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, []);

  // 더블 엔터 트래커
  const enterTracker = useRef(createLastEnterTracker());

  // 섹션/아이템 변경 헬퍼
  const setSectionsAndEmit = useCallback(
    (updater: (prev: ProceedingSection[]) => ProceedingSection[]) => {
      setSections((prev) => {
        const next = normalizeSections(updater(prev));
        pendingEmitRef.current = true; // 내부 변경 표시
        return next;
      });
    },
    [],
  );

  // 변경 로직
  const updateTitle = useCallback(
    (secIdx: number, val: string) => {
      console.log(val);
      setSectionsAndEmit((prev) => prev.map((s, i) => (i === secIdx ? { ...s, title: val } : s)));
    },
    [setSectionsAndEmit],
  );

  // 삽입 로직
  const updateItem = useCallback(
    (secIdx: number, itemIdx: number, val: string) => {
      setSectionsAndEmit((prev) =>
        prev.map((s, i) =>
          i === secIdx ? { ...s, items: s.items.map((it, j) => (j === itemIdx ? val : it)) } : s,
        ),
      );
    },
    [setSectionsAndEmit],
  );

  const insertItemBelow = useCallback(
    (secIdx: number, itemIdx: number) => {
      setSectionsAndEmit((prev) =>
        prev.map((s, i) =>
          i === secIdx
            ? { ...s, items: [...s.items.slice(0, itemIdx + 1), '', ...s.items.slice(itemIdx + 1)] }
            : s,
        ),
      );
      setTimeout(() => focus(keyOfItem(secIdx, itemIdx + 1)), 0);
    },
    [focus, setSectionsAndEmit],
  );

  const insertSectionBelow = useCallback(
    (secIdx: number) => {
      setSectionsAndEmit((prev) => [
        ...prev.slice(0, secIdx + 1),
        { title: '', items: [''] },
        ...prev.slice(secIdx + 1),
      ]);
      setTimeout(() => focus(keyOfTitle(secIdx + 1)), 0);
    },
    [focus, setSectionsAndEmit],
  );

  const deleteSectionAndFocusPrevLastItem = useCallback(
    (secIdx: number) => {
      if (secIdx <= 0) return;
      setSectionsAndEmit((prev) => [...prev.slice(0, secIdx), ...prev.slice(secIdx + 1)]);
      setTimeout(() => focus(keyOfItem(secIdx - 1, Number.POSITIVE_INFINITY)), 0);
    },
    [focus, setSectionsAndEmit],
  );

  const deleteItemAndFocusPrev = useCallback(
    (secIdx: number, itemIdx: number) => {
      if (itemIdx > 0) {
        setSectionsAndEmit((prev) =>
          prev.map((s, i) =>
            i === secIdx
              ? { ...s, items: [...s.items.slice(0, itemIdx), ...s.items.slice(itemIdx + 1)] }
              : s,
          ),
        );
        setTimeout(() => focus(keyOfItem(secIdx, itemIdx - 1)), 0);
        return;
      }
      if (secIdx > 0) {
        setSectionsAndEmit((prev) => [...prev.slice(0, secIdx), ...prev.slice(secIdx + 1)]);
        setTimeout(() => focus(keyOfItem(secIdx - 1, Number.POSITIVE_INFINITY)), 0);
      }
    },
    [focus, setSectionsAndEmit],
  );

  // 키 핸들러
  const onTitleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, secIdx: number) => {
      if (e.nativeEvent.isComposing) return;

      // ===== 방향키 네비게이션
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        // 같은 섹션 첫 불렛으로 이동 (커서는 맨 앞)
        focus(keyOfItem(secIdx, 0), false);
        enterTracker.current.reset();
        return;
      }
      if (e.key === 'ArrowUp') {
        if (secIdx > 0) {
          e.preventDefault();
          // 이전 섹션 마지막 불렛으로 이동 (커서는 맨 뒤)
          focus(keyOfItem(secIdx - 1, Number.POSITIVE_INFINITY), true);
          enterTracker.current.reset();
          return;
        }
      }
      if (e.key === 'ArrowLeft' && isAtHead(e.currentTarget)) {
        if (secIdx > 0) {
          e.preventDefault();
          // 이전 섹션 마지막 불렛
          focus(keyOfItem(secIdx - 1, Number.POSITIVE_INFINITY), true);
          enterTracker.current.reset();
          return;
        }
      }
      if (e.key === 'ArrowRight' && isAtTail(e.currentTarget)) {
        e.preventDefault();
        // 같은 섹션 첫 불렛
        focus(keyOfItem(secIdx, 0), false);
        enterTracker.current.reset();
        return;
      }

      // ===== Enter: 아래 새 불렛 생성 + 포커스
      if (e.key === 'Enter') {
        e.preventDefault();
        setSectionsAndEmit((prev) =>
          prev.map((s, i) => (i === secIdx ? { ...s, items: [...s.items, ''] } : s)),
        );
        setTimeout(() => focus(keyOfItem(secIdx, Number.POSITIVE_INFINITY)), 0);
        enterTracker.current.reset();
        return;
      }

      // ===== Backspace at head: 이전 섹션 마지막 불렛으로 포커스 + 현재 섹션 삭제
      if (e.key === 'Backspace') {
        const el = e.currentTarget;
        const atHead = el.selectionStart === 0 && el.selectionEnd === 0;
        if (atHead) {
          e.preventDefault();
          if (secIdx > 0) {
            deleteSectionAndFocusPrevLastItem(secIdx);
          }
          enterTracker.current.reset();
        }
      }
    },
    [deleteSectionAndFocusPrevLastItem, focus, setSectionsAndEmit],
  );

  const onItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, secIdx: number, itemIdx: number) => {
      if (e.nativeEvent.isComposing) return;

      const el = e.currentTarget;
      const lastItemIdx = sections[secIdx].items.length - 1;

      // ===== 방향키 네비게이션
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (itemIdx > 0) {
          // 같은 섹션 이전 불렛 (커서 뒤)
          focus(keyOfItem(secIdx, itemIdx - 1), true);
        } else {
          // 섹션 제목으로
          focus(keyOfTitle(secIdx), true);
        }
        enterTracker.current.reset();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (itemIdx < lastItemIdx) {
          // 같은 섹션 다음 불렛 (커서 앞)
          focus(keyOfItem(secIdx, itemIdx + 1), false);
        } else if (secIdx < sections.length - 1) {
          // 다음 섹션 제목으로
          focus(keyOfTitle(secIdx + 1), false);
        }
        enterTracker.current.reset();
        return;
      }

      if (e.key === 'ArrowLeft' && isAtHead(el)) {
        e.preventDefault();
        if (itemIdx > 0) {
          focus(keyOfItem(secIdx, itemIdx - 1), true);
        } else {
          // 첫 불렛의 맨 앞 -> 섹션 제목
          focus(keyOfTitle(secIdx), true);
        }
        enterTracker.current.reset();
        return;
      }

      if (e.key === 'ArrowRight' && isAtTail(el)) {
        e.preventDefault();
        if (itemIdx < lastItemIdx) {
          focus(keyOfItem(secIdx, itemIdx + 1), false);
        } else if (secIdx < sections.length - 1) {
          focus(keyOfTitle(secIdx + 1), false);
        }
        enterTracker.current.reset();
        return;
      }

      // ===== enter
      const key = enterKeyForItem(sections, secIdx, itemIdx);

      if (e.key === 'Enter') {
        e.preventDefault();

        const curVal = (e.currentTarget as HTMLInputElement).value;
        const empty = curVal === '';

        // "마지막 불렛"에서 "연속 두 번 Enter" → 새 섹션
        if (isLastItem(sections, secIdx, itemIdx) && enterTracker.current.isDoubleEnter(key)) {
          setSectionsAndEmit((prev) => {
            const next = prev.map((s) => ({ ...s, items: [...s.items] }));
            if (empty) next[secIdx].items.splice(itemIdx, 1); // 비어있으면 그 불렛 제거
            next.splice(secIdx + 1, 0, { title: '', items: [''] }); // 새 섹션 삽입
            return next;
          });
          setTimeout(() => focus(keyOfTitle(secIdx + 1)), 0); // 새 섹션 제목 포커스
          return;
        }

        // 기본: 아래 새 불렛
        insertItemBelow(secIdx, itemIdx);
        return;
      }

      // ===== backspace
      if (e.key === 'Backspace') {
        const el = e.currentTarget;
        const atHead = el.selectionStart === 0 && el.selectionEnd === 0;
        if (atHead) {
          e.preventDefault();
          deleteItemAndFocusPrev(secIdx, itemIdx);
          enterTracker.current.reset();
          return;
        }
      }

      // ==== 기타 → 더블 Enter 상태 리셋
      enterTracker.current.reset();
    },
    [deleteItemAndFocusPrev, focus, insertItemBelow, sections, setSectionsAndEmit],
  );

  // blur: 스코프 밖 이탈
  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const next = e.relatedTarget as Node | null;
      if (next && editingScopeRef?.current?.contains(next)) return;

      // 편집 모드 모두 끄기
      setEditing(EditorType.PROCEEDING, false);
      setEditing(EditorType.TITLE, false);
    },
    [setEditing, editingScopeRef],
  );

  return (
    <div
      // 임시 높이 잡아둠
      className={clsx(
        'p-20pxr rounded-10pxr scrollbar-component h-950pxr min-h-0 w-full overflow-y-auto bg-gray-600',
        disabled ? 'disabled-style' : '',
      )}
      aria-disabled={disabled}
    >
      {sections.map((sec, secIdx) => (
        <section key={secIdx} className="mb-20pxr">
          {/* 제목 행 (넘버링 고정 UI) */}
          <div className="gap-8pxr mb-8pxr flex items-center">
            <div className="w-24pxr text-right select-none">{secIdx + 1}.</div>
            <input
              ref={setRef(keyOfTitle(secIdx))}
              className="rounded-6pxr p-8pxr text-t4-bd flex-1 outline-none focus:outline-none"
              value={sec.title}
              onChange={(e) => updateTitle(secIdx, e.target.value)}
              onKeyDown={(e) => onTitleKeyDown(e, secIdx)}
              placeholder="제목 입력"
              disabled={disabled}
              onBlur={onBlur}
            />
          </div>

          {/* 불렛 리스트 */}
          <ul className="ml-24pxr">
            {sec.items.map((it, itemIdx) => (
              <li key={itemIdx} className="gap-8pxr mb-6pxr flex items-center">
                <div className="w-24pxr text-center select-none">•</div>
                <input
                  ref={setRef(keyOfItem(secIdx, itemIdx))}
                  className="rounded-6pxr p-8pxr text-b2-rg flex-1 outline-none focus:outline-none"
                  value={it}
                  onChange={(e) => updateItem(secIdx, itemIdx, e.target.value)}
                  onKeyDown={(e) => onItemKeyDown(e, secIdx, itemIdx)}
                  placeholder="내용 입력"
                  disabled={disabled}
                  onBlur={onBlur}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default ProceedingEditor;
