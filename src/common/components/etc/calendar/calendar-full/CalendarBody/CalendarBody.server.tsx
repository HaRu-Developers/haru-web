const CalendarBody = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className="h-28pxr w-1030pxr grid grid-cols-7">
      {days.map((day) => (
        <span key={day} className="w-147pxr text-bt3-sb flex justify-center text-gray-300">
          {day}
        </span>
      ))}
    </div>
  );
};

export default CalendarBody;
