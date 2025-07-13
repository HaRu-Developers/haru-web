export interface DatePickerProps {
  /* 초기 선택된 날짜들 */
  selectedDates?: Date[];
  /* 날짜 선택 시 호출되는 콜백 */
  onChange?: (dates: Date[]) => void;
  onConfirm?: (dates: Date[]) => void;
  onCancel?: () => void;
}
