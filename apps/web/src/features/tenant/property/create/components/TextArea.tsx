'use client'

import React from 'react'
import { Field } from 'formik'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ITextAreaCustomProps {
    labelName: string,
    name: string,
    placeholder: string
}

const TextAreaCustom = ({ labelName, name, placeholder }: ITextAreaCustomProps) => {
  return (
    <div className="grid items-center gap-1.5 w-full relative">
        <Label htmlFor={name} className='text-base ml-5'>{labelName}</Label>
        {
          name === 'password' && (
            <p className='absolute right-3 top-[2px] text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Forgot Password?</p>
          )
        }
        <Field 
        as={Textarea} 
        name={name}
        placeholder={placeholder}
        className="w-full p-5 border border-slate-400 h-[100px] text-base rounded-3xl"
        />
    </div>
  )
}

export default TextAreaCustom
