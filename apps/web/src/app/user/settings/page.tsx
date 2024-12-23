'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast from 'react-hot-toast'

const UserSettingsPage = () => {

  const { mutate: mutateDeleteAccount, isPending: isPendingDeleteAccount } = useMutation({
    mutationFn: async() => {
        const res = await instance.delete('/user')
        console.log(res)
        return res
    },
    onSuccess: (res) => {
        // toast.success(res)
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
            <button disabled={isPendingDeleteAccount} onClick={() => mutateDeleteAccount()} className='disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90'>
                <RiDeleteBin6Line size={18}/>
                Delete
            </button>
        </div>
      </section>
    </main>
  )
}

export default UserSettingsPage
