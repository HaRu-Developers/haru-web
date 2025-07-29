export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export interface ToastItem {
  key: string;
  text: string;
  type: ToastType;
  duration?: number;
}
