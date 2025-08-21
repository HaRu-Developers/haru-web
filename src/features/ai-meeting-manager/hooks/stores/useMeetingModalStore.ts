import { useShallow } from 'zustand/shallow';

import meetingModalStore from '@features/ai-meeting-manager/stores/meeting-modal-store';

export const useMeetingModalInfo = () =>
  meetingModalStore(
    useShallow((state) => ({
      isOpenEndMeetingModal: state.isOpenEndMeetingModal,
      isOpenMmLoadingModal: state.isOpenMmLoadingModal,
    })),
  );

export const useMeetingModalActions = () => meetingModalStore((state) => state.actions);
