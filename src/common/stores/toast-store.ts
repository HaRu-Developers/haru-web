import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ToastItem } from '@common/types/toast.types';

interface ToastStoreState {
  toastList: ToastItem[]; // 현재 보여지는 토스트
  actions: {
    addToast: (toast: Omit<ToastItem, 'key'>) => void;
    removeToast: (key: string) => void;
    clearToasts: () => void;
  };
}

const toastStore = create<ToastStoreState>()(
  devtools(
    immer((set, get) => ({
      toastList: [],
      actions: {
        addToast: (toast) => {
          const { type, text } = toast;
          // 중복 방지용 키
          const key = `${type}-${text}`;
          const state = get();
          // 이미 존재하는 동일한 토스트는 무시
          if (state.toastList.some((t) => t.key === key)) return;

          const newToast: ToastItem = { ...toast, key };
          set((s) => {
            s.toastList.push(newToast);
          });
        },
        removeToast: (key) => {
          set((s) => {
            s.toastList = s.toastList.filter((t) => t.key !== key);
          });
        },
        clearToasts: () =>
          set((s) => {
            s.toastList = [];
          }),
      },
    })),
    { name: 'ToastStore' },
  ),
);

export default toastStore;
