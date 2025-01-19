'use client'

import React from 'react'
import { Field } from 'formik'

const CheckOutTimeInputSection = ({
  setFieldValue,
  setInputCheckOutStartTime,
  values,
  setInputCheckOutEndTime,
}: {
  setFieldValue: any
  setInputCheckOutStartTime: any
  values: any
  setInputCheckOutEndTime: any
}) => {
  return (
    <section className="flex sm:flex-row flex-col sm:items-center justify-between bg-white shadow-md border border-gray-200 rounded-md p-3">
      <div className="grid items-center gap-1.5 w-full relative">
        <label
          htmlFor="checkOutStartTime"
          className="text-sm font-bold text-gray-900"
        >
          Check-Out Start Time (optional)
        </label>
        <Field
          name="checkOutStartTime"
          type="time"
          id="checkOutStartTime"
          onChange={(e: any) => {
            setFieldValue('checkOutStartTime', e.target.value)
            setInputCheckOutStartTime(e.target.value)
          }}
          value={values?.checkOutStartTime}
          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
        />
      </div>
      <div className="grid items-center gap-1.5 w-full relative">
        <label
          htmlFor="checkOutEndTime"
          className="text-sm font-bold text-gray-900"
        >
          Check-Out End Time
        </label>
        <Field
          name="checkOutEndTime"
          type="time"
          id="checkOutEndTime"
          onChange={(e: any) => {
            setFieldValue('checkOutEndTime', e.target.value)
            setInputCheckOutEndTime(e.target.value)
          }}
          value={values?.checkOutEndTime}
          className="hover:cursor-text hover:opacity-60 transition duration-100 w-fit rounded-md px-3 py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm focus:outline-none focus:border-blue-600"
        />
      </div>
    </section>
  )
}

export default CheckOutTimeInputSection
