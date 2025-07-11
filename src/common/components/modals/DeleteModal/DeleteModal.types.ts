'use client';
export enum DeleteModalType {
  DELETE_REPORT = 'report',
  DELETE_MEETING_MINUTES = 'meeting_minutes',
  DELETE_EVENT = 'event',
  LEAVE_MEETING_RECORD = 'leave_meeting_record',
  CONNECT_INSTAGRAM_ACCOUNT = 'connect_instagram_account',
}
export interface DeleteModalProps {
  deleteModalType: DeleteModalType;

  onClose: () => void;
  onAbort: () => void;
  onProceed: () => void;
}
