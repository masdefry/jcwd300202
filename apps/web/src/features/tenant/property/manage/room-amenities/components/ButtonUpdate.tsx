'use client'

import React from 'react'
import { FiSend } from 'react-icons/fi'

const ButtonUpdate = ({ setIsSubmitting, isPending, disabled }: any) => {
  return (
    <section className="px-5">
      <button
        type="button"
        disabled={disabled || isPending}
        onClick={() => setIsSubmitting(true)}
        className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:cursor-not-allowed bg-blue-800 text-sm rounded-full w-full px-5 py-3 flex gap-1.5 items-center justify-center font-bold text-white hover:opacity-75 transition duration-100 active:scale-95"
      >
        <FiSend className="text-base" />
        Update
      </button>
    </section>
  )
}

export default ButtonUpdate
