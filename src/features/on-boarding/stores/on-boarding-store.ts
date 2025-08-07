import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { OnboardingStep } from '../constants/step';

interface OnboardingStoreState {
  step: OnboardingStep;
  name: string;
  image: File | null;
  workspaceId: string | null;
  emails: string[];
  isInstagramConnected: boolean;
  actions: {
    setName: (name: string) => void;
    setImage: (file: File) => void;
    setWorkspaceId: (workspaceId: string) => void;
    addEmail: (email: string) => void;
    removeEmail: (index: number) => void;
    setEmails: (emails: string[]) => void;
    setInstagramConnected: (connected: boolean) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
  };
}

const useOnboardingStore = create<OnboardingStoreState>()(
  persist(
    devtools(
      immer((set) => ({
        step: OnboardingStep.NAME,
        name: '',
        image: null,
        workspaceId: null,
        emails: [],
        isInstagramConnected: false,

        actions: {
          setName: (name) =>
            set((state) => {
              state.name = name;
            }),
          setImage: (file) =>
            set((state) => {
              state.image = file;
            }),
          setWorkspaceId: (id) =>
            set((state) => {
              state.workspaceId = id;
            }),
          addEmail: (email) =>
            set((state) => {
              if (!state.emails.includes(email)) {
                state.emails.push(email);
              }
            }),
          removeEmail: (index) =>
            set((state) => {
              state.emails.splice(index, 1);
            }),
          setEmails: (emails) =>
            set((state) => {
              state.emails = emails;
            }),
          setInstagramConnected: (connected) =>
            set((state) => {
              state.isInstagramConnected = connected;
            }),
          nextStep: () =>
            set((state) => {
              if (state.step < OnboardingStep.INTEGRATE) {
                state.step += 1;
              }
            }),
          prevStep: () =>
            set((state) => {
              if (state.step > OnboardingStep.NAME) {
                state.step -= 1;
              }
            }),
          reset: () =>
            set((state) => {
              state.step = OnboardingStep.NAME;
              state.name = '';
              state.image = null;
              state.emails = [];
              state.isInstagramConnected = false;
            }),
        },
      })),
    ),
    {
      name: 'onboarding-storage', // sessionStorage에 저장될 때 사용될 key 이름
      storage: createJSONStorage(() => sessionStorage), // localStorage 대신 sessionStorage 사용
      partialize: (state) => ({
        step: state.step,
        name: state.name,
        workspaceId: state.workspaceId,
        emails: state.emails,
        isInstagramConnected: state.isInstagramConnected,
      }),
    },
  ),
);

export default useOnboardingStore;
