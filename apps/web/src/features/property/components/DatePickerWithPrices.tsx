'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format } from "date-fns";

interface IDate {
  date: any,
  day: any
}

interface IDatePickerWithPricesProps {
  dateAndPrice: any,
  basePrice: number
}

const DatePickerWithPrices = ({ dateAndPrice = {}, basePrice = 0 }: IDatePickerWithPricesProps) => {
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [checkInDate, checkOutDate] = dateRange;
  
  const formatPrice = (price: number): string => {
    return price >= 1000000
      ? `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
      : price.toString();
  };
  
  const formattedDailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(dateAndPrice).map(([date, price]: any) => [date, formatPrice(price)])
  );
  
  const dailyPrices: Record<string, string> = Object.fromEntries(
    Object.entries(dateAndPrice).map(([date, price]: any) => [date, formatPrice(price)])
  );

  const renderMonthContents = (month: any) => {
    return (
          <div className="flex flex-col items-center">
            <span>{month}</span>
            <div className="price-tag">{dailyPrices["2025-01-17"]}</div>
          </div>
        );
  }

  const renderDayContents = (day: number, date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const editedBasePrice = Number(basePrice) >= 1000000
    ? `${(basePrice / 1000000).toFixed(basePrice % 1000000 === 0 ? 0 : 1)}M`
    : basePrice.toString()
    const dailyPrice = formattedDailyPrices[dateString] || editedBasePrice;
    return (
    <div className="flex flex-col items-center mx-1">
        <span className="text-sm font-bold px-2">{day}</span>
        {dailyPrice && <div className="text-xs font-semibold text-gray-700 focus:text-white">{dailyPrice}</div>}
      </div>
    );
  };

  return (
    <div>
      <DatePicker
      selectsRange={true}
      startDate={checkInDate}
      endDate={checkOutDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal
      monthsShown={1}
      renderDayContents={renderDayContents}
      renderMonthContent={renderMonthContents}
      placeholderText="Select your period"
      className="focus:outline-0 focus:border-blue-800 min-w-max rounded-l-md border-2 border-amber-400 placeholder-shown:text-xs text-xs font-bold placeholder-shown:font-bold px-5 py-2"
    />
    </div>
  );
};

export default DatePickerWithPrices;

