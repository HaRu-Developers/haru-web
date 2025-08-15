import { enableMapSet } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

enableMapSet(); // Set/Map 불변 업데이트 허용 - Immer에서 Set 조작 허용하기 위해

/**
 * 회의록 리스트 전역 상태
 */
interface ListStoreState {
  isCheckMode: boolean;
  checkedIds: Set<string>;
  isAnyChecked: boolean; // 하나 이상 체크 여부
  actions: {
    toggleCheckMode: () => void;
    toggleChecked: (id: string) => void;
    clearChecked: () => void;
  };
}

const listStore = create<ListStoreState>()(
  devtools(
    immer((set) => ({
      isCheckMode: false,
      checkedIds: new Set(),
      isAnyChecked: false,
      actions: {
        // 체크 모드 활성화/비활성화
        toggleCheckMode: () =>
          set((state) => ({
            isCheckMode: !state.isCheckMode,
            // 선택모드 종료 시  checkedIds, isAnyChecked 초기화
            ...(state.isCheckMode ? { checkedIds: new Set(), isAnyChecked: false } : {}),
          })),
        // 각 요소 체크, 체크 해제 - Set 활용
        toggleChecked: (id) =>
          set((state) => {
            if (state.checkedIds.has(id)) {
              state.checkedIds.delete(id);
            } else {
              state.checkedIds.add(id);
            }
            state.isAnyChecked = state.checkedIds.size > 0;
          }),
        // 요소들의 체크 상태 초기화
        clearChecked: () =>
          set({
            checkedIds: new Set(),
            isAnyChecked: false,
          }),
      },
    })),
    { name: 'ai-meeting-manager/listStore' },
  ),
);

export default listStore;
