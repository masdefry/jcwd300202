'use client'

import React from 'react'

const UpdateProfileConfirmationPopup = ({
  isPendingUpdateTenantProfilePicture,
  isSubmitting,
  setIsSubmitting,
  mutateUpdateTenantProfilePicture,
  mutateUpdateTenantProfile,
  values,
  isPendingUpdateTenantProfile,
}: {
    isPendingUpdateTenantProfilePicture: boolean,
    isSubmitting: boolean,
    setIsSubmitting: any,
    mutateUpdateTenantProfilePicture: any,
    mutateUpdateTenantProfile: any,
    values: any,
    isPendingUpdateTenantProfile: boolean,
}) => {
  return (
    <div
      className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
    >
      <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
        <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
          Are you sure you want to update your profile?
        </h1>
        <article className="text-sm font-medium text-gray-500">
          Please review your information before submitting. Your changes cannot
          be undone once saved.
        </article>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsSubmitting(false)}
            className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSubmitting(false)
              const fd: any = new FormData()
              fd.append('images', values?.file[0])
              mutateUpdateTenantProfilePicture(fd)
              mutateUpdateTenantProfile({
                email: values.email,
                pic: values.pic,
                phoneNumber: values.phoneNumber,
                address: values.address,
                companyName: values.companyName,
              })
            }}
            disabled={
              isPendingUpdateTenantProfile ||
              isPendingUpdateTenantProfilePicture
            }
            className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfileConfirmationPopup
