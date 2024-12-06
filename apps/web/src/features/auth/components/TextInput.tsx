'use client'

import React from 'react'
import { Field } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface ITextInputProps {
    labelName: string,
    name: string,
    placeholder: string,
    type: string
}

const TextInput = ({ labelName, name, placeholder, type }: ITextInputProps) => {
  return (
    <div className="grid items-center gap-1.5 w-full relative">
        <Label htmlFor={name} className='text-base ml-4'>{labelName}</Label>
        {
          name === 'password' && (
            <p className='absolute right-3 top-0 text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Forgot Password?</p>
          )
        }
        <Field as={Input} name={name} type={type} id={name} placeholder={placeholder} className="w-full p-6 text-base rounded-full"/>
    </div>
  )
}

export default TextInput
