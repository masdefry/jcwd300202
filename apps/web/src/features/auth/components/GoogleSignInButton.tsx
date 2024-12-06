'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleSignInButton = () => {
  return (
    <section>
        <section className='flex flex-col gap-1'>
            <button className='p-3 active:scale-95 transition duration-200 hover:bg-gray-300 rounded-full border border-gray-300 w-full text-base flex items-center justify-center font-bold gap-3'><FcGoogle size={23}/>Sign in with Google</button>
        </section>
    </section>
  )
}

export default GoogleSignInButton
