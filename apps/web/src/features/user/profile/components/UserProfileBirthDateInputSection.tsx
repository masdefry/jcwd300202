'use client'

import { ErrorMessage, Field } from 'formik'
import React from 'react'

const UserProfileBirthDateInputSection = () => {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor="birth-date" className="text-sm font-bold text-black ml-5">
        Birthdate
      </label>
      <div id="birthdate-section" className="flex items-center gap-2">
        <div className="w-full flex flex-col gap-1">
          <Field
            as="select"
            name="date"
            defaultValue="select-date"
            className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="select-date">Date</option>
            {Array.from({ length: 31 }).map((_, index) => {
              return (
                <option key={index} value={index + 1}>
                  {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                </option>
              )
            })}
          </Field>
          <ErrorMessage
            name="date"
            component={'div'}
            className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Field
            as="select"
            name="month"
            defaultValue="select-month"
            className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="select-month">Month</option>
            {Array.from({ length: 12 }).map((_, index) => {
              return (
                <option key={index} value={index + 1}>
                  {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                </option>
              )
            })}
          </Field>
          <ErrorMessage
            name="month"
            component={'div'}
            className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <Field
            as="select"
            name="year"
            defaultValue="select-year"
            className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="select-year">Year</option>
            {Array.from({ length: 100 }).map((_, index) => {
              return (
                <option
                  key={index}
                  value={new Date().getFullYear() - index - 1}
                >
                  {new Date().getFullYear() - index - 1}
                </option>
              )
            })}
          </Field>
          <ErrorMessage
            name="year"
            component={'div'}
            className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfileBirthDateInputSection
