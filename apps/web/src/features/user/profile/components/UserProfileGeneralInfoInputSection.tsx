'use client'

import { ErrorMessage, Field } from 'formik'
import React from 'react'

const UserProfileGeneralInfoInputSection = () => {
  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="username" className="text-sm font-bold text-black ml-5">
          Name
        </label>
        <Field
          id="username"
          name="username"
          type="text"
          placeholder="Roomify"
          className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
        />
        <ErrorMessage
          name="username"
          component={'div'}
          className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1 ">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-bold text-black ml-5"
        >
          Phone Number
        </label>
        <Field
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          placeholder="08128192xxxxxx "
          className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
        />
        <ErrorMessage
          name="phoneNumber"
          component={'div'}
          className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="gender" className="text-sm font-bold text-black ml-5">
          Gender
        </label>
        <Field
          as="select"
          name="gender"
          defaultValue="select-gender"
          className="bg-white border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="select-gender">Select a gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </Field>
        <ErrorMessage
          name="gender"
          component={'div'}
          className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
        />
      </div>
    </div>
  )
}

export default UserProfileGeneralInfoInputSection
