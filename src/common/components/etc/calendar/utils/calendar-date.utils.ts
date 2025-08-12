/*
 * 그 달의 1일을 기준으로 가장 가까운 일요일을 시작일 34일 후를 종료일로 설정
 * 추가로 타이틀과 집중할 월을 반환하는 함수
 */

export const getCalendarDates = (currentDate: Date) => {
  const title = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
  const sunday = new Date(currentDate);
  sunday.setDate(currentDate.getDate() - currentDate.getDay());
  const monthLater = new Date(sunday);
  monthLater.setDate(sunday.getDate() + 34);
  const operatingMonth = currentDate.getMonth() + 1;

  return {
    startDate: sunday,
    endDate: monthLater,
    title,
    operatingMonth,
  };
};
