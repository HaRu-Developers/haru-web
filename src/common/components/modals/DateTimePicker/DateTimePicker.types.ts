import { Dispatch, SetStateAction } from 'react';

export interface DateTimePickerProps {
  selectedDateTime: Date | null;
  setSelectedDateTime: Dispatch<SetStateAction<Date | null>>;
}
