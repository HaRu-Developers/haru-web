import Cancel32pxButton from '../../buttons/32px/Cancel32pxButton';
import CompleteSelectButton from '../../buttons/32px/CompleteSelectButton';
import { DatePickerFooterProps } from './DatePickerFooter.types';

const DatePickerFooter = ({ onConfirm, onCancel }: DatePickerFooterProps) => (
  <div className="border-stroke-200 flex justify-end gap-[6px] rounded-b-2xl border-t bg-white pt-3 pb-4">
    <Cancel32pxButton onClick={onCancel} />
    <CompleteSelectButton onClick={onConfirm} />
  </div>
);

export default DatePickerFooter;
