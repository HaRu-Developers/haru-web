// stores/modalStore.js
import { create } from 'zustand';

// 각 모달 인스턴스를 위한 인터페이스
export interface ModalInstance {
  id: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  options?: {
    overlayClickToClose?: boolean;
    zIndex?: number;
  };
}

interface ModalStore {
  modals: ModalInstance[];
  openModal: (
    component: React.ComponentType<any>,
    props?: Record<string, any>,
    options?: ModalInstance['options'],
  ) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  // 모달 열기
  openModal: (component, props = {}, options = {}) => {
    const id = `modal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newModal: ModalInstance = { id, component, props, options };
    set((state) => ({ modals: [...state.modals, newModal] }));
    return id;
  },

  // 특정 모달 닫기
  closeModal: (id: string) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    }));
  },

  // 모든 모달 닫기
  closeAllModals: () => {
    set({ modals: [] });
  },
}));

export default useModalStore;
