// stores/calendarStore.ts
import { create } from 'zustand';

interface CalendarState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentDate: new Date(new Date().setDate(1)),
  setCurrentDate: (date) => set({ currentDate: date }),
}));
