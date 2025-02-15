import { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "../styles/component-styles.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const [currentDate, setCurrentDate] = useState(dayjs(selectedDate));

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
        const isSelected = date.isSame(selectedDate, "day");
        week.push(
          <td
            key={`day-${day}`}
            className={`day ${isSelected ? "selected" : ""}`}
            onClick={() => onChange(date)}
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

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="custom-date-picker">
      <div className="header">
        <button onClick={goToPreviousMonth}>
          <RiArrowLeftSLine className="acition-btn-icon" />
        </button>
        <span>{currentDate.format("MMMM YYYY")}</span>
        <button onClick={goToNextMonth}>
          <RiArrowRightSLine className="acition-btn-icon" />
        </button>
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
CustomDatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomDatePicker;
