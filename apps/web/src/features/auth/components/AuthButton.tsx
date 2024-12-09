'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface IAuthButton {
  text: string,
  isPending: boolean,
}

const AuthButton = ({ text, isPending }: IAuthButton) => {
  return (
    <div className='w-full'>
      <Button className={`w-full p-6 rounded-full text-base ${isPending ? 'bg-slate-600 text-white hover:bg-slate-600' : 'active:scale-95'} transition duration-200`} type='submit' disabled={isPending}>{text}</Button>
    </div>
  )
}

export default AuthButton
