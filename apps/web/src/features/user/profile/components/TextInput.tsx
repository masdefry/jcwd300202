'use client'

import { Field, ErrorMessage } from 'formik'
import React from 'react'

const TextInput = ({ name, title, type, placeholder }: { name: string, title: string, type: string, placeholder: string }) => {
  return (
    <div className='flex flex-col gap-1 '>
        <label htmlFor="pic" className='text-sm font-bold text-black ml-5'>{title}</label>
        <Field id={name} name={name} type={type} placeholder={placeholder} className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
        <ErrorMessage name={name} component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
    </div>
  )
}

export default TextInput
