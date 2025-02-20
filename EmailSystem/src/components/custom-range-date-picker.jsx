import { useState } from "react";
import dayjs from "dayjs";

const CustomDateRangePicker = ({ startDate, endDate, onChange }) => {
  const [currentDate, setCurrentDate] = useState(dayjs(startDate));
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  // Get the days in the current month
  const daysInMonth = currentDate.daysInMonth();

  // Get the first day of the month
  const firstDayOfMonth = currentDate.startOf("month").day();

  // Generate the calendar grid
  const calendarGrid = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(<td key={`empty-${j}`} className="empty"></td>);
      } else if (day > daysInMonth) {
        break;
      } else {
        const date = currentDate.date(day);
        const isStartDate = date.isSame(tempStartDate, "day");
        const isEndDate = date.isSame(tempEndDate, "day");
        const isInRange =
          date.isAfter(tempStartDate, "day") &&
          date.isBefore(tempEndDate, "day");

        week.push(
          <td
            key={`day-${day}`}
            className={`day ${isStartDate ? "start-date" : ""} ${
              isEndDate ? "end-date" : ""
            } ${isInRange ? "in-range" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {day}
          </td>
        );
        day++;
      }
    }
    calendarGrid.push(<tr key={`week-${i}`}>{week}</tr>);
    if (day > daysInMonth) break;
  }

  // Handle date selection
  const handleDateClick = (date) => {
    if (!tempStartDate || date.isBefore(tempStartDate, "day")) {
      setTempStartDate(date);
      setTempEndDate(null);
    } else if (!tempEndDate) {
      setTempEndDate(date);
      onChange(tempStartDate, date);
    } else {
      setTempStartDate(date);
      setTempEndDate(null);
    }
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="custom-date-range-picker">
      <div className="header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>{currentDate.format("MMMM YYYY")}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{calendarGrid}</tbody>
      </table>
    </div>
  );
};

export default CustomDateRangePicker;
