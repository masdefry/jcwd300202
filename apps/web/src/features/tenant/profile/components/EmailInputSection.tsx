'use client'

import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { MdVerified } from 'react-icons/md'
import { RiCloseCircleFill } from 'react-icons/ri'

const EmailInputSection = ({
  dataTenantProfile,
  setShowChangeEmail,
  setNewEmail,
  showChangeEmail,
  newEmail,
  isPendingUpdateEmail,
  mutateUpdateEmail,
}: {
    dataTenantProfile: any,
    setShowChangeEmail: any,
    setNewEmail: any,
    showChangeEmail: any,
    newEmail: any,
    isPendingUpdateEmail: boolean,
    mutateUpdateEmail: any,
}) => {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col gap-1 w-full justify-center">
        <label
          htmlFor="email"
          className="text-sm font-bold text-black ml-5 flex items-center gap-1"
        >
          Email
          {dataTenantProfile?.isVerified ? (
            <MdVerified className="text-blue-600" size={13} />
          ) : (
            <RiCloseCircleFill className="text-red-600" size={13} />
          )}
        </label>
        <Field
          id="email"
          name="email"
          type="email"
          disabled
          placeholder="mfauzi@gmail.com"
          className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
        />
        <div className="text-slate-600 px-5 text-xs italic font-medium mt-[-5px] p-1 rounded-full z-20">
          If you change your email address, a verification link will be sent to
          the new email. Please check your inbox (and spam folder) to verify the
          change and complete the process.
        </div>
        <ErrorMessage
          name="email"
          component={'div'}
          className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
        />
        <button
          type="button"
          onClick={() => {
            setShowChangeEmail(true)
          }}
          className="2xl:hidden w-full flex px-5 py-2 font-bold hover:opacity-70 active:scale-90 transition duration-100 text-sm bg-gray-900 text-white border border-gray-900 rounded-full"
        >
          Change
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          setShowChangeEmail(true)
        }}
        className="2xl:flex hidden mb-5 px-5 py-2 font-bold hover:opacity-70 active:scale-90 transition duration-100 text-sm bg-gray-900 text-white w-fit border border-gray-900 rounded-full"
      >
        Change
      </button>
      {showChangeEmail && (
        <section className="fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center p-5 justify-center">
          <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7">
            <div className="flex items-center justify-end">
              <IoClose
                className="hover:opacity-75 hover:cursor-pointer text-gray-900 "
                onClick={() => setShowChangeEmail(false)}
              />
            </div>
            <hgroup className="flex flex-col mt-[-10px]">
              <h1 className="text-lg font-bold text-slate-800">Change Email</h1>
              <p className="text-sm font-light text-gray-500">
                Switch to a New Email Address
              </p>
            </hgroup>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 ">
                <label className="text-sm font-bold text-black ml-5">
                  Current Email
                </label>
                <Field
                  name="email"
                  disabled={true}
                  type="text"
                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                />
                <ErrorMessage
                  name="propertyTypeName"
                  component={'div'}
                  className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <label className="text-sm font-bold text-black ml-5">
                  New Email
                </label>
                <Field
                  id="newEmail"
                  value={newEmail}
                  onChange={(e: any) => setNewEmail(e.target.value)}
                  name="newEmail"
                  type="text"
                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2"
                />
                <ErrorMessage
                  name="newEmail"
                  component={'div'}
                  className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
                />
              </div>
            </div>
            <article className="text-sm font-medium italic max-w-[400px] text-center">
              Once you enter your new email address, we will send a verification
              link to that address. Please check your inbox and click the link
              to confirm your email change.
            </article>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowChangeEmail(false)}
                className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => mutateUpdateEmail()}
                disabled={isPendingUpdateEmail}
                className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 "
              >
                Update
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default EmailInputSection
