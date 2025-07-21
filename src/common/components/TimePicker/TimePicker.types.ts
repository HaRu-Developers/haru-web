export interface TimePickerProps {
  onTimeSelect: (time: string) => void;
  selectedDateTime?: Date | null;
}
