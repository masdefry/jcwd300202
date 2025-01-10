'use client'

import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { Label } from '@/components/ui/label'

interface ITextAreaCustomProps {
    labelName: string,
    name: string,
    placeholder: string
}

const TextAreaCustom = ({ labelName, name, placeholder }: ITextAreaCustomProps) => {
  return (
    <div className="grid items-center gap-1.5 w-full relative">
        <Label htmlFor={name} className='ttext-sm font-bold text-gray-900'>{labelName}</Label>
        {
          name === 'password' && (
            <p className='absolute right-3 top-[2px] text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Forgot Password?</p>
          )
        }
        <Field 
        as="textarea" 
        name={name}
        placeholder={placeholder}
        className="w-full px-2 h-[100px] py-1.5 border-2 border-slate-300 text-sm placeholder-shown:text-sm rounded-md focus:outline-none focus:border-blue-600"
        />
        <ErrorMessage name={name} component={'div'} className='text-red-600 text-xs font-bold bg-red-200 rounded-full p-1 px-5'/>
    </div>
  )
}

export default TextAreaCustom
