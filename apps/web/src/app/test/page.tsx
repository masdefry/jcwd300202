'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";

interface IDate {
  date: any,
  day: any
}

const DatePickerPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const [price, setPrice] = useState(0);

  // Example price for each day (can be customized to dynamic pricing)
  const rawDailyPrices: Record<string, number> = {
    "2024-12-01": 500000,
    "2024-12-02": 1200000,
    "2024-12-03": 900000,
    "2024-12-04": 1100000,
    "2024-12-05": 1500000,
    "2024-12-06": 1700000,
    "2025-01-17": 2300000,
    // Add more dates as needed
  };
  
  const formatPrice = (price: number): string => {
    return price >= 1000000
      ? `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
      : price.toString();
  };
  
  // Create formatted prices for display
  const formattedDailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(rawDailyPrices).map(([date, price]) => [date, formatPrice(price)])
  );
  
  
  // Log to verify
  console.log(formattedDailyPrices);
  
  // Create a formatted daily prices object
  const dailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(rawDailyPrices).map(([date, price]) => [date, formatPrice(price)])
  );

  // Function to handle date selection
  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);

    // Calculate total price based on selected date range
    let totalPrice = 0;
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const dateString = format(currentDate, "yyyy-MM-dd");
    //   totalPrice += dailyPrices[dateString] || 100; // Default price is 100 if not specified
      currentDate = addDays(currentDate, 1);
    }
    setPrice(totalPrice);
  };
  const renderMonthContents = (month: any) => {
    console.log(month)
    return (
        //   <div className="date-price-container">
          <div className="flex flex-col items-center">
            <span>{month}</span>
            <div className="price-tag">{dailyPrices["2025-01-17"]}</div>
          </div>
        );
  }
  // Function to display the price tag under each date
  const renderDayContents = ({day, date}: any) => {
    console.log(JSON.stringify(date))
    const dateString = format(date, "yyyy-MM-dd");
    // const price = dailyPrices[dateString] || 100; // Default price if no specific price exists
    return (
    //   <div className="date-price-container">
      <div className="flex flex-col items-center">
        <span>{day}</span>
        <div className="price-tag">{formattedDailyPrices[dateString]}</div>
      </div>
    );
  };

  return (
    <div className="w-full p-5">
      <h1>Property Rental Date Picker</h1>
      <p>Select your check-in and check-out dates:</p>
      <DatePicker
        selected={checkInDate}
        onChange={handleDateChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        selectsRange
        minDate={new Date()} // Prevent selecting past dates
        inline
        renderDayContents={renderDayContents}
        // renderMonthContent={}
        renderMonthContent={renderMonthContents} // Custom render for each day
        dateFormat="yy-MM-dd"
        className="min-w-max"
        monthsShown={2}
      />

      {price > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Price:</h3>
          <h2>${price}</h2>
        </div>
      )}
    </div>
  );
};

export default DatePickerPage;

