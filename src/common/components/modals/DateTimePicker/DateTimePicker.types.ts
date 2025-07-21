import { Dispatch, SetStateAction } from 'react';

export interface DateTimePickerProps {
  selectedDateTime: Date | null;
  setSelectedDateTime: Dispatch<SetStateAction<Date | null>>;
  datePickerTitle?: string;
  timePickerTitle?: string;
  className?: string;
}
