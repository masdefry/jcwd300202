'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

interface IAuthButton {
  text: string
}

const AuthButton = ({ text }: IAuthButton) => {
  return (
    <div className='w-full'>
      <Button className='w-full p-6 rounded-full text-base active:scale-95 transition duration-200' type='submit'>{text}</Button>
    </div>
  )
}

export default AuthButton
