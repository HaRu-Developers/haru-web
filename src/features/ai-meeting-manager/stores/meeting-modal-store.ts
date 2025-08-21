import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface MeetingModalStoreState {
  isOpenEndMeetingModal: boolean;
  isOpenMmLoadingModal: boolean; // 회의록 생성 중 모달
  actions: {
    openEndMeetingModal: () => void;
    closeEndMeetingModal: () => void;
    openMmLoadingModal: () => void;
    closeMmLoadingModal: () => void;
  };
}

/**
 * 회의 모달 관련 store
 * */
const meetingModalStore = create<MeetingModalStoreState>()(
  devtools(
    immer((set) => ({
      isOpenEndMeetingModal: false,
      isOpenMmLoadingModal: false,
      actions: {
        openEndMeetingModal: () => set((s) => ({ ...s, isOpenEndMeetingModal: true })),
        closeEndMeetingModal: () => set((s) => ({ ...s, isOpenEndMeetingModal: false })),
        openMmLoadingModal: () => set((s) => ({ ...s, isOpenMmLoadingModal: true })),
        closeMmLoadingModal: () => set((s) => ({ ...s, isOpenMmLoadingModal: false })),
      },
    })),
    { name: 'ai-meeting-manager/meetingModalStore' },
  ),
);

export default meetingModalStore;
