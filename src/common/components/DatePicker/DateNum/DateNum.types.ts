export interface DateNumProps {
  date: Date;
  currentMonth: number;
  selectedList: Date[];
  onSelect: (d: Date) => void;
}
