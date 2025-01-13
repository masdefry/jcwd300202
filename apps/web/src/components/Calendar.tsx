'use client'

import React, { useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import { format } from 'date-fns';

const PropertyRentingCalendar = () => {
  // State to track selected range
  const [date, setDate] = useState(new Date()); // Currently selected date
  const [selectedRange, setSelectedRange] = useState([null, null]); // Start and end dates

  // Handle the date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Handle mouse drag to select range
  const [dragging, setDragging] = useState(false);
  const [dragStartDate, setDragStartDate] = useState(null);

  const handleMouseDown = (date) => {
    setDragging(true);
    setDragStartDate(date);
  };

  const handleMouseUp = () => {
    if (dragging && dragStartDate) {
      setDragging(false);
    }
  };

  const handleMouseOver = (date) => {
    if (dragging && dragStartDate) {
      const newRange = [dragStartDate, date].sort((a, b) => a - b);
      setSelectedRange(newRange);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="w-full h-full max-w-screen-md"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Calendar
          value={date}
          onChange={handleDateChange}
          className="w-full h-full"
          tileClassName={({ date, view }) => {
            // Highlight the range of selected dates
            if (selectedRange[0] && selectedRange[1]) {
              if (date >= selectedRange[0] && date <= selectedRange[1]) {
                return 'bg-blue-500 text-white';
              }
            }
            return '';
          }}
          tileDisabled={({ date }) => false} // Disable any tiles from being disabled (if needed)
          onClickDay={handleDateChange}
          onMouseDown={handleMouseDown}
          onMouseOver={handleMouseOver}
        />
      </div>

      <div className="mt-4 text-center">
        {selectedRange[0] && selectedRange[1] && (
          <p>
            <span className="font-semibold">Selected Range: </span>
            {`${format(selectedRange[0], 'MMM d, yyyy')} - ${format(selectedRange[1], 'MMM d, yyyy')}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyRentingCalendar;