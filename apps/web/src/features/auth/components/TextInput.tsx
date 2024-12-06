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
    <div className="grid items-center gap-1.5 w-full">
        <Label htmlFor={name} className='text-base ml-4'>{labelName}</Label>
        <Field as={Input} name={name} type={type} id={name} placeholder={placeholder} className="w-full p-6 text-base rounded-full"/>
    </div>
  )
}

export default TextInput
