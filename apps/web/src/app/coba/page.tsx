'use client';

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";


export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  const dailyPrices: Record<string, number> = {
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
    "2025-01-16": 2285714,
  };

    const handleSelect = (selected: DateRange | undefined) => {
        if (selected?.from && selected?.to) {
          setDate(selected);
        } else if (selected?.from) {
          setDate({ from: selected.from, to: addDays(selected.from, 1) });
        }
      };

  const getPriceForDateRange = (range: DateRange) => {
    const startDate = range.from ? format(range.from, "yyyy-MM-dd") : '';
    const endDate = range.to ? format(range.to, "yyyy-MM-dd") : '';

    let totalPrice = 0;

    if (startDate && endDate) {
      for (let d = new Date(range.from); d <= range.to; d = addDays(d, 1)) {
        const dateString = format(d, "yyyy-MM-dd");
        totalPrice += dailyPrices[dateString] || 0;
      }
    }

    return totalPrice;
  };

  const renderDay = (day: Date) => {
    const dateString = format(day, "yyyy-MM-dd");
    const price = dailyPrices[dateString];


    return (
      <div className="relative">
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex-1 flex items-center justify-center w-full rounded-md" >
               {day.getDate()}
            </div>
            {price && (
                <span className="text-xs mt-1 text-gray-500">{ (price / 1000000).toFixed(1) }M</span>
            )}
        </div>
      </div>
        );
      };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")} | Total Price:{" "}
                  {getPriceForDateRange(date)}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                initialFocus
                mode="range"
                selected={date}
                onSelect={handleSelect}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                components={{
                   Day: ({ day, ...props }) => {
                      return <DayPicker.components.Day {...props}> {renderDay(day)} </DayPicker.components.Day>
                   },
                }}
            />
        </PopoverContent>
      </Popover>
      <div className="text-sm mt-2">
        {date?.from && <p>Check-in: {format(date.from, "LLL dd, y")}</p>}
        {date?.to && <p>Check-out: {format(date.to, "LLL dd, y")}</p>}
      </div>
    </div>
  );
}