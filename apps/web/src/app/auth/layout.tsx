'use client'

import authStore from '@/zustand/authStore'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { GoHome } from "react-icons/go";
import Link from 'next/link'
import { FiSend } from "react-icons/fi";

interface IAuthLayout {
    children: ReactNode
}

const AuthLayout = ({ children }: IAuthLayout) => {
  return (
    <main className='p-10 pb-28 relative h-screen'>
      <div className='fixed bottom-0 right-0 w-full p-10 flex justify-end flex-wrap items-center gap-5'>
        <Link href='/'>
          <div className="drop-shadow-md bg-black rounded-full text-white active:scale-90 p-2 transition duration-100 hover:opacity-80 hover:cursor-pointer">
            <GoHome size={20}/>
          </div>
        </Link>
        <Link href='/auth/verify/request-email'>
          <div className="drop-shadow-md bg-black rounded-full text-white flex hover:opacity-80 items-center gap-2 text-sm px-6 py-2 active:scale-90 transition duration-100 hover:cursor-pointer">
            <FiSend size={20}/><p>Request Verify Email</p>
          </div>
        </Link>
      </div>
      {children}
    </main>
  )
}

export default AuthLayout
