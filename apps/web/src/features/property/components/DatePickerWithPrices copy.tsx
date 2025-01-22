'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";

interface IDate {
  date: any,
  day: any
}

const DatePickerWithPrices = () => {
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
    "2024-12-07": 1714286,
    "2024-12-08": 1728571,
    "2024-12-09": 1742857,
    "2024-12-10": 1757143,
    "2024-12-11": 1771429,
    "2024-12-12": 1785714,
    "2024-12-13": 1800000,
    "2024-12-14": 1814286,
    "2024-12-15": 1828571,
    "2024-12-16": 1842857,
    "2024-12-17": 1857143,
    "2024-12-18": 1871429,
    "2024-12-19": 1885714,
    "2024-12-20": 1900000,
    "2024-12-21": 1914286,
    "2024-12-22": 1928571,
    "2024-12-23": 1942857,
    "2024-12-24": 1957143,
    "2024-12-25": 1971429,
    "2024-12-26": 1985714,
    "2024-12-27": 2000000,
    "2024-12-28": 2014286,
    "2024-12-29": 2028571,
    "2024-12-30": 2042857,
    "2024-12-31": 2057143,
    "2025-01-01": 2071429,
    "2025-01-02": 2085714,
    "2025-01-03": 2100000,
    "2025-01-04": 2114286,
    "2025-01-05": 2128571,
    "2025-01-06": 2142857,
    "2025-01-07": 2157143,
    "2025-01-08": 2171429,
    "2025-01-09": 2185714,
    "2025-01-10": 2200000,
    "2025-01-11": 2214286,
    "2025-01-12": 2228571,
    "2025-01-13": 2242857,
    "2025-01-14": 2257143,
    "2025-01-15": 2271429,
    "2025-01-16": 2285714
  };
  
  const formatPrice = (price: number): string => {
    return price >= 1000000
      ? `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
      : price.toString();
  };
  
  const formattedDailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(rawDailyPrices).map(([date, price]) => [date, formatPrice(price)])
  );
  
  const dailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(rawDailyPrices).map(([date, price]) => [date, formatPrice(price)])
  );

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);

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
  const renderDayContents = (day: number, date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const dailyPrice = formattedDailyPrices[dateString] || '2.0M';
    // console.log(JSON.stringify(date))
    // const dateString = format(date, "yyyy-MM-dd");
    // const price = dailyPrices[dateString] || 100; // Default price if no specific price exists
    return (
    //   <div className="date-price-container">
    <div className="flex flex-col items-center mx-1">
        <span className="text-sm font-bold px-2">{day}</span>
        {dailyPrice && <div className="text-xs font-semibold text-gray-300 focus:text-white">{dailyPrice}</div>}
      </div>
      // <div className="flex flex-col items-center">
      //   <span>{day}</span>
      //   <div className="price-tag">{formattedDailyPrices[dateString]}</div>
      // </div>
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
        renderMonthContent={renderMonthContents} // Custom render for each day
        dateFormat="yy-MM-dd"
        className="min-w-max"
        monthsShown={2}
        withPortal
      />
{/* 
      {price > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Price:</h3>
          <h2>${price}</h2>
        </div>
      )} */}
    </div>
  );
};

export default DatePickerWithPrices;

