'use client'

import authStore from '@/zustand/authStore'
import Cookies from 'js-cookie'
import React from 'react'

const LogoutConfirmationPopup = ({
  showConfirmationToLogout,
  setShowConfirmationToLogout,
}: {
    showConfirmationToLogout: boolean,
  setShowConfirmationToLogout: any
}) => {
  
  const profilePictureUrl = authStore((state) => state.profilePictureUrl)
  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  const setLogout = authStore((state) => state.setLogout)
  return (
    <div
      className={`${showConfirmationToLogout ? 'flex' : 'hidden'} p-5 items-center justify-center fixed bg-black bg-opacity-25 backdrop-blur-sm w-full h-full top-0 left-0 z-[51]`}
    >
      <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
        <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
          Log Out Confirmation
        </h1>
        <article className="text-sm font-medium text-gray-500">
          Are you sure you want to log out?
        </article>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setShowConfirmationToLogout(false)
            }}
            className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100"
          >
            No, Stay Logged In
          </button>
          <button
            type="button"
            onClick={() => {
              setShowConfirmationToLogout(false)
              setLogout()
              Cookies.remove('authToken')
              Cookies.remove('authRole')
              window.location.href = '/'
            }}
            className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-red-700 border-slate-100"
          >
            Yes, Log Me Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmationPopup
