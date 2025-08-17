import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { EditorType } from '../types/edit.types';

interface EditStoreState {
  editing: Record<EditorType, boolean>; // 각 editor 의 편집 상태
  commitTick: number; // 저장 요청
  cancelTick: number; // 취소 요청
  actions: {
    setEditing: (id: EditorType, v: boolean) => void;
    requestCommit: () => void; // 모든 editor에 “저장” 요청 신호
    requestCancel: () => void; // 모든 editor에 “취소” 요청 신호
    resetEditing: () => void; // 모든 editor 수정 상태 끄기
  };
}

/**
 * 회의록 수정 관련 store
 * */
const editStore = create<EditStoreState>()(
  devtools(
    immer((set) => ({
      editing: { [EditorType.TITLE]: false, [EditorType.PROCEEDING]: false },
      commitTick: 0,
      cancelTick: 0,
      actions: {
        setEditing: (id, v) => set((s) => ({ editing: { ...s.editing, [id]: v } })),
        requestCommit: () => set((s) => ({ commitTick: s.commitTick + 1 })),
        requestCancel: () => set((s) => ({ cancelTick: s.cancelTick + 1 })),
        resetEditing: () =>
          set((s) => {
            // 모든 편집 종료
            s.editing[EditorType.TITLE] = false;
            s.editing[EditorType.PROCEEDING] = false;
          }),
      },
    })),
    { name: 'ai-meeting-manager/EditStore' },
  ),
);

export default editStore;
