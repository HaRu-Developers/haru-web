export const formatTime = (hour: number, minute: number): string => {
  const hh = hour.toString().padStart(2, '0');
  const mm = minute.toString().padStart(2, '0');
  const suffix = hour < 12 ? 'AM' : 'PM';
  return `${hh}:${mm} ${suffix}`;
};

export const timeSlots: string[] = (() => {
  const slots: string[] = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      slots.push(formatTime(hour, minute));
    }
  }
  return slots;
})();
