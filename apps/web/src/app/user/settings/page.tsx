'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast from 'react-hot-toast'

const UserSettingsPage = () => {
    
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { mutate: mutateDeleteAccount, isPending: isPendingDeleteAccount } = useMutation({
    mutationFn: async() => {
        const res = await instance.delete('/user')
        return res?.data
    },
    onSuccess: (res) => {
        toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
    },
    onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Connection error')
    }
  })  

  return (
      <main className='flex flex-col gap-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Settings</h1>
        <p className='text-sm font-medium text-gray-500'>Manage your account</p>
      </hgroup>
      <section className='flex flex-col gap-4 py-4'>
        <div className='bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between'>   
            <hgroup className='flex flex-col'>
                <h1 className='text-gray-800 text-medium font-bold'>Delete Account</h1>
                <p className='text-gray-400 text-xs font-semibold'>Deleting your account will result in you not being able to get notifications from Roomify</p>
            </hgroup>
            <button disabled={isPendingDeleteAccount} onClick={() => setIsSubmitting(true)} className='disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90'>
                <RiDeleteBin6Line size={18}/>
                Delete
            </button>
            <div className={`${!isSubmitting && 'hidden'} backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}>
                  <div className='bg-white rounded-3xl flex flex-col justify-between gap-3 p-5'>
                    <h1 className='text-lg font-bold text-gray-800 pb-2 border-b border-b-slate-300'>
                    Are you sure you want to delete your account?
                    </h1>
                    <article className='text-base font-light text-gray-700'>
                    This action is permanent and cannot be undone. All of your data will be lost, and you will no longer be able to access your account.
                    </article>
                    <div className='flex items-center justify-end gap-2'>
                      <button type='button' onClick={() => setIsSubmitting(false)} className='border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center'>Cancel</button>
                      <button type='button' 
                      onClick={() => {
                        setIsSubmitting(false)
                        mutateDeleteAccount()
                        }} 
                      className='z-20 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-90 transition duration-100 bg-red-600 text-white text-sm font-bold px-5 py-3 shadow-md justify-center'>Delete Account</button>
                    </div>
                  </div>
            </div>
        </div>
      </section>
    </main>
  )
}

export default UserSettingsPage
