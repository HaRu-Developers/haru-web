// 날짜,시간 내림차순 정렬
const sortDateTimeDesc = (dates: string[]): string[] => {
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
};
