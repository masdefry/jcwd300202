'use client'

import React, { ReactNode } from 'react'

interface IAuthLayout {
    children: ReactNode
}

const AuthLayout = ({ children }: IAuthLayout) => {
  return (
    <main className='p-10'>
      {children}
    </main>
  )
}

export default AuthLayout
