'use client'

import React, { useEffect, useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ITextInputProps {
    labelName: string,
    name: string,
    placeholder: string,
    type: string
}

const TextInput = ({ labelName, name, placeholder, type }: ITextInputProps) => {
  const pathname = usePathname()
  const [ forgotPassUrl, setForgotPassUrl ] = useState('')

  useEffect(() => {
    if(pathname.includes('/tenant')) {
      setForgotPassUrl('/tenant/auth/reset-password')
    } else {
      setForgotPassUrl('/auth/reset-password')
    }
  },[])

  return (
    <div className="grid items-center gap-1 w-full relative">
        <Label htmlFor={name} className='text-base ml-5'>{labelName}</Label>
        {
          name === 'password' && (
            <Link href={forgotPassUrl}>
              <p className='absolute right-3 top-[2px] text-sm font-semibold text-blue-600 border-b-2 border-transparent hover:border-blue-600 active:scale-90 transition duration-200 hover:cursor-pointer w-fit'>Forgot Password?</p>
            </Link>
          )
        }
        <Field as={Input} name={name} type={type} id={name} placeholder={placeholder} className="w-full p-6 border border-slate-400 text-base rounded-full"/>
        <ErrorMessage name={name} component={'div'} className='text-red-600 text-xs font-bold mt-[-15px] bg-red-200 rounded-full p-1 px-5'/>
    </div>
  )
}

export default TextInput
