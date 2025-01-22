'use client'

import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { IoIosSend } from 'react-icons/io'
import useManageTenantSettingsHook from '../../../features/tenant/settings/hooks/useManageTenantSettingsHook'
import DeleteTenantConfirmationPopup from '../../../features/tenant/settings/components/DeleteTenantConfirmationPopup'

const UserSettingsPage = () => {
  const {
    isDeleted,
    setChange,
    passwordForDelete,
    setPasswordForDelete,
    isSubmitting,
    setIsSubmitting,
    mutateDeleteAccount,
    isPendingDeleteAccount,
    mutateRequestVerifyEmail,
    isPendingRequestVerifyEmail,
  } = useManageTenantSettingsHook()

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
            <DeleteTenantConfirmationPopup
              mutateDeleteAccount={mutateDeleteAccount}
              setPasswordForDelete={setPasswordForDelete}
              setIsSubmitting={setIsSubmitting}
              setChange={setChange}
              passwordForDelete={passwordForDelete}
              isPendingDeleteAccount={isPendingDeleteAccount}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default UserSettingsPage
