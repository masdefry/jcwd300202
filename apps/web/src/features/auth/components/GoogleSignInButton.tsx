'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'

interface IGoogleSignInButtonProps {
  mutateOAuth: any,
  isPending: boolean,
}

const GoogleSignInButton = ({ mutateOAuth, isPending }: IGoogleSignInButtonProps) => {
  return (
    <section>
        <section className='flex flex-col gap-1'>
            <button onClick={() => !isPending && mutateOAuth()} className={`p-3 active:scale-95 hover:bg-slate-300 border-slate-300 disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 transition duration-200  border rounded-full w-full text-sm flex items-center justify-center font-bold gap-3`}><FcGoogle size={23}/>Sign in with Google</button>
        </section>
    </section>
  )
}

export default GoogleSignInButton
