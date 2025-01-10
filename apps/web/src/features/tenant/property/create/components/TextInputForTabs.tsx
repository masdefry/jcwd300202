'use client'

import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface ITextInputForTabsProps {
    labelName: string,
    name: string,
    placeholder: string,
    type: string,
}

const TextInputForTabs = ({ labelName, name, placeholder, type }: ITextInputForTabsProps) => {
  return (
    <div className="grid items-center gap-1.5 w-full relative">
        <Label htmlFor={name} className='text-sm font-bold text-gray-900'>{labelName}</Label>
        {
          name === 'password' && (
            <p className='absolute right-3 top-[2px] text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Forgot Password?</p>
          )
        }
        <Field name={name} type={type} id={name} placeholder={placeholder}
        className="w-full py-1.5 border-b-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-none focus:outline-none focus:border-blue-600"/>
        <ErrorMessage name={name} component={'div'} className='text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5'/>
    </div>
  )
}

export default TextInputForTabs
