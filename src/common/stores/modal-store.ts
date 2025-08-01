import React from 'react';

import { create } from 'zustand';

export interface BaseModalProps {
  onClose?: () => void;
}

export interface ModalInstance<P extends Record<string, unknown> = Record<string, unknown>> {
  id: string;
  component: React.ComponentType<P>;
  props?: P;
  options?: {
    overlayClickToClose?: boolean;
    zIndex?: number;
  };
}

interface ModalStore {
  modals: ModalInstance[];

  openModal: <P extends Record<string, unknown>>(
    component: React.ComponentType<P>,
    props?: P,
    options?: ModalInstance['options'],
  ) => string;

  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: [],

  openModal: <P extends Record<string, unknown>>(
    component: React.ComponentType<P>,
    props: P = {} as P,
    options: ModalInstance['options'] = {},
  ) => {
    const id = `modal-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newModal: ModalInstance<P> = { id, component, props, options };
    set((state) => ({
      modals: [...state.modals, newModal as ModalInstance<Record<string, unknown>>],
    }));

    return id;
  },

  closeModal: (id: string) => {
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    }));
  },

  closeAllModals: () => {
    set({ modals: [] });
  },
}));

export default useModalStore;
