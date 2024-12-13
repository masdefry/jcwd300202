'use client'

import React, { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker'; // Gantilah dengan import library datepicker yang sesuai
import { useForm } from 'react-hook-form';

interface PriceData {
  [date: string]: number;
}

interface FormData {
  date: string;
  price: number;
}

const DatePickerWithPrice = () => {
    const [prices, setPrices] = useState<PriceData>({
        '2024-12-18': 2900000,
        '2024-12-19': 3000000,
        '2024-12-20': 3000000,
        '2024-12-21': 3000000,
          '2024-12-22': 3000000,
        '2024-12-23': 0,
        '2024-12-24': 3100000,
          '2024-12-25': 0,
        '2024-12-26': 3400000,
        '2024-12-27': 3600000,
        '2024-12-28': 3700000,
          '2024-12-29': 3900000,
        '2024-12-30': 3800000,
        '2024-12-31': 3800000,

     '2025-01-01': 0,
       '2025-01-02': 0,
        '2025-01-03': 0,
        '2025-01-04': 3500000,
        '2025-01-05': 0,
        '2025-01-06': 0,
        '2025-01-07': 0,
        '2025-01-08': 0,
        '2025-01-09': 0,
       '2025-01-10': 0,
        '2025-01-11': 3400000,
        '2025-01-12': 3500000,
        '2025-01-13': 3500000,
        '2025-01-14': 3400000,
        '2025-01-15': 3500000,
        '2025-01-16': 3700000,
        '2025-01-17': 3800000,
         '2025-01-18': 3800000,
         '2025-01-19': 3700000,
        '2025-01-20': 3500000,
        '2025-01-21': 3500000,
         '2025-01-22': 3500000,
        '2025-01-23': 3700000,
         '2025-01-24': 3800000,
         '2025-01-25': 3600000,
         '2025-01-26': 3500000,
        '2025-01-27': 3400000,
         '2025-01-28': 3400000,
         '2025-01-29': 3500000,
         '2025-01-30': 3700000,
         '2025-01-31': 0,
      }
    );
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.date]: data.price,
        }));
        setValue('price', 0);
        setValue('date','');

    };

    const formatPrice = (price: number) => {
        if (price === 0 ) return "-";
      return (price / 1000000).toFixed(1) + 'M';
    };


     const renderDayContent = (date: Date) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const price = prices[formattedDate] || 0;

    return (
       <div className="text-center">
          <span>{date.getDate()}</span>
            <span className="block text-xs text-gray-500">
            {formatPrice(price)}
           </span>
       </div>
    );
  };


    useEffect(() => {
        console.log("current price: ", prices)
    }, [prices])

    return (
        <div className="flex flex-col">

                <div className="mb-4 ">
                     <DatePicker renderDayContent={renderDayContent}/>
                  </div>
                    <h2 className='font-bold'>Set Price</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className='flex flex-col'>
                       <label>Date:</label>
                        <input {...register('date', { required: true })} type="date" className="border border-gray-300 rounded p-2" />
                        {errors.date && <p className="text-red-500">Date is required</p>}
                     </div>
                     <div className='flex flex-col'>
                       <label>Price:</label>
                       <input {...register('price', { required: true, valueAsNumber: true })} type="number" className="border border-gray-300 rounded p-2" />
                         {errors.price && <p className="text-red-500">Price is required</p>}
                     </div>
                    <button type="submit" className="bg-blue-500 text-white rounded p-2">
                       Set Price
                    </button>
                </form>
        </div>
    );
};

export default DatePickerWithPrice;