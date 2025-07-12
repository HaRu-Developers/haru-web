export enum LoadingModalType {
  CREATE_SURVEY = 'survey',
  MEETING_MINUTES = 'meeting_minutes',
  SNS_EVENT = 'sns_event',
}
export interface LoadingModalProps {
  onClose: () => void;
  modalType: LoadingModalType;
}
