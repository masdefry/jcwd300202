'use client'

import { Field } from 'formik'
import React from 'react'

const CheckInTimeInputSection = ({
  setFieldValue,
  setInputCheckInStartTime,
  values,
  setInputCheckInEndTime,
}: {
  setFieldValue: any
  setInputCheckInStartTime: any
  values: any
  setInputCheckInEndTime: any
}) => {
  return (
    <section className="flex sm:flex-row flex-col sm:items-center justify-between bg-white shadow-md border border-gray-200 rounded-md p-3">
      <div className="grid items-center gap-1.5 w-full relative">
        <label
          htmlFor="checkInStartTime"
          className="text-sm font-bold text-gray-900"
        >
          Check-In Start Time
        </label>
        <Field
          name="checkInStartTime"
          type="time"
          id="checkInStartTime"
          onChange={(e: any) => {
            setFieldValue('checkInStartTime', e.target.value)
            setInputCheckInStartTime(e.target.value)
          }}
          value={values?.checkInStartTime}
          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
        />
      </div>
      <div className="grid items-center gap-1.5 w-full relative">
        <label
          htmlFor="checkInEndTime"
          className="text-sm font-bold text-gray-900"
        >
          Check-In End Time (optional)
        </label>
        <Field
          name="checkInEndTime"
          type="time"
          id="checkInEndTime"
          onChange={(e: any) => {
            setFieldValue('checkInEndTime', e.target.value)
            setInputCheckInEndTime(e.target.value)
          }}
          value={values?.checkInEndTime}
          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
        />
      </div>
    </section>
  )
}

export default CheckInTimeInputSection
