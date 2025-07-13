export interface DatePickerBodyProps {
  activeStartDate?: Date;
  selectedDates: Date[];
  onChange: (date: Date) => void;
  onActiveStartDateChange?: (details: { activeStartDate: Date | null }) => void;
}

export interface CalendarTileProps {
  date: Date;
  view: string;
}
