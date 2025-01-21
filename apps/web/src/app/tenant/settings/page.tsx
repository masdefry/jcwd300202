'use client'

import instance from '@/utils/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import toast from 'react-hot-toast'
import { IoIosSend } from 'react-icons/io'
import { PiCity } from 'react-icons/pi'
import { IoClose } from 'react-icons/io5'
import Cookies from 'js-cookie'
import authStore from '@/zustand/authStore'

const UserSettingsPage = () => {
  const setLogout = authStore(state => state.setLogout())
  const [isDeleted, setIsDeleted] = useState(false)
  const [change, setChange] = useState(true)
  const [passwordForDelete, setPasswordForDelete] = useState({
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate: mutateDeleteAccount, isPending: isPendingDeleteAccount } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.delete('/tenant')
        return res?.data
      },
      onSuccess: (res) => {
        setIsDeleted(true)
        setLogout()
        Cookies.remove('authToken')
        Cookies.remove('authRole')
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const {
    mutate: mutateRequestVerifyEmail,
    isPending: isPendingRequestVerifyEmail,
  } = useMutation({
    mutationFn: async () => {
      const res = await instance.post(
        '/auth/tenant/verify-change-email-request',
      )
      return res?.data
    },
    onSuccess: (res) => {
      console.log(res)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          Check your email to verify!
          <button
            className="bg-gray-900 hover:opacity-75 active:scale-90 text-white rounded-full px-4 py-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </span>
      ))
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center justify-center text-xs font-semibold text-red-700">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })
  return (
    <main className="flex flex-col gap-5">
      <hgroup className="flex flex-col pb-5 border-b-4 border-slate-700">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm font-medium text-gray-500">Manage your account</p>
      </hgroup>
      <section className="flex flex-col gap-4 py-4">
        <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
          <hgroup className="flex flex-col">
            <h1 className="text-gray-800 text-medium font-bold">
              Verify Email
            </h1>
            <p className="text-gray-400 text-xs font-semibold">
              Check your inbox and verify your email to get started
            </p>
          </hgroup>
          <button
            disabled={isPendingRequestVerifyEmail}
            onClick={() => mutateRequestVerifyEmail()}
            className="disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-white transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-slate-900 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90"
          >
            <IoIosSend size={18} />
            Send Email
          </button>
        </div>
        <div className="bg-white px-5 pb-4 border-b border-slate-300 flex items-center justify-between">
          <hgroup className="flex flex-col">
            <h1 className="text-gray-800 text-medium font-bold">
              Delete Account
            </h1>
            <p className="text-gray-400 text-xs font-semibold">
              Deleting your account will result in you not being able to get
              notifications from Roomify
            </p>
          </hgroup>
          <button
            disabled={isPendingDeleteAccount || isDeleted}
            onClick={() => setIsSubmitting(true)}
            className="disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-white transition duration-100 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 rounded-full px-5 py-3 shadow-sm hover:opacity-75 active:scale-90"
          >
            <RiDeleteBin6Line size={18} />
            Delete
          </button>
          {isSubmitting && (
            <div className="fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center p-5">
              <div className="bg-white shadow-md p-5 rounded-md flex flex-col gap-7 w-[400px]">
                <div className="flex items-center justify-end">
                  <IoClose
                    className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                    onClick={() => {
                      setPasswordForDelete({ password: '' })
                      setIsSubmitting(false)
                    }}
                  />
                </div>
                <hgroup className="flex flex-col mt-[-10px]">
                  <h1 className="text-lg font-bold text-slate-800">
                    Confirm Account Deletion
                  </h1>
                  <p className="text-sm font-light text-gray-500">
                    Are you sure you want to delete your account?
                  </p>
                </hgroup>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1 ">
                    <label className="text-sm font-bold text-black">
                      Please confirm by password below:
                    </label>
                    <input
                      id="password"
                      onChange={(e: any) => {
                        setPasswordForDelete((state: any) => {
                          state.password = e.target.value
                          return state
                        })
                        setChange((state) => !state)
                      }}
                      name="password"
                      type="password"
                      placeholder="secure123"
                      className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:border-blue-800 border-b-2 border-slate-300 rounded-none py-1.5"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setPasswordForDelete({ password: '' })
                      setIsSubmitting(false)
                    }}
                    className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={
                      passwordForDelete.password.length < 8 ||
                      isPendingDeleteAccount
                    }
                    onClick={() => {
                      setIsSubmitting(false)
                      mutateDeleteAccount()
                    }}
                    className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default UserSettingsPage
