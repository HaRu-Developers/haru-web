'use client';

import CompleteSelectButton from '@buttons/32px/CompleteSelectButton/CompleteSelectButton.client';
import CancelButton from '@buttons/diverse-size/CancelButton/CancelButton.client';
import { CancelButtonType } from '@buttons/diverse-size/CancelButton/CancelButton.types';

import { DatePickerFooterProps } from './DatePickerFooter.types';

const DatePickerFooter = ({ onConfirm, onCancel }: DatePickerFooterProps) => (
  <div className="border-stroke-200 flex justify-end gap-1.5 rounded-b-2xl border-t bg-white pt-3 pb-4">
    <CancelButton buttonType={CancelButtonType.SIZE_32} onClick={onCancel} />
    <CompleteSelectButton onClick={onConfirm} />
  </div>
);

export default DatePickerFooter;
