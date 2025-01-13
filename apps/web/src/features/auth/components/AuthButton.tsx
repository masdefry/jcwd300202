'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface IAuthButton {
  text: string,
  isPending: boolean
}

const AuthButton = ({ text, isPending }: IAuthButton) => {
  return (
    <div className='w-full'>
      <button className={`disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 bg-gray-900 text-white font-bold  w-full p-3 rounded-full text-base active:scale-95 transition duration-200`} type='submit' disabled={isPending }>{text}</button>
    </div>
  )
}

export default AuthButton
