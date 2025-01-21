'use client'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import React from 'react'
import { FaRegSave } from 'react-icons/fa'
import { updateUserProfileValidationSchema } from '@/features/user/profile/schemas/updateUserProfileValidationSchema'
import useManageUserProfileHook from '@/features/user/profile/hooks/useManageUserProfileHook'
import UserProfilePictureInputSection from '@/features/user/profile/components/UserProfilePictureInputSection'
import UserProfileBirthDateInputSection from '@/features/user/profile/components/UserProfileBirthDateInputSection'
import UserProfileEmailInputSection from '@/features/user/profile/components/UserProfileEmailInputSection'
import UserProfileGeneralInfoInputSection from '@/features/user/profile/components/UserProfileGeneralInfoInputSection'

const ProfileUserPage = () => {
  const {
    imagePreview,
    setImagePreview,
    showChangeEmail,
    setShowChangeEmail,
    newEmail,
    setNewEmail,
    dataUserProfile,
    isPendingUserProfile,
    isSubmitting,
    setIsSubmitting,
    isPendingUpdateEmail,
    isPendingUpdateUserProfile,
    mutateUpdateEmail,
    mutateUpdateUserProfile,
    mutateUpdateUserProfilePicture,
  } = useManageUserProfileHook()

  return (
    <main className="flex flex-col gap-5">
      <hgroup className="flex flex-col pb-5 border-b-4 border-slate-700">
        <h1 className="text-2xl font-bold text-gray-800">Account</h1>
        <p className="text-sm font-medium text-gray-500">Change your profile</p>
      </hgroup>
      <Formik
        initialValues={{
          file: [] as File[],
          email: dataUserProfile?.email || '',
          username: dataUserProfile?.username || '',
          gender: dataUserProfile?.gender || '',
          phoneNumber: dataUserProfile?.phoneNumber || '',
          date: dataUserProfile?.date ? dataUserProfile?.date : null,
          month: dataUserProfile?.month ? dataUserProfile?.month : null,
          year: dataUserProfile?.year ? dataUserProfile?.year : null,
          address: dataUserProfile?.address || '',
        }}
        validationSchema={updateUserProfileValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          setIsSubmitting(false)
          const fd: any = new FormData()
          fd.append('images', values?.file[0])
          mutateUpdateUserProfilePicture(fd)
          mutateUpdateUserProfile({
            email: values.email,
            username: values.username,
            gender: values.gender,
            phoneNumber: values.phoneNumber,
            date: values.date,
            month: values.month,
            year: values.year,
            address: values.address,
          })
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-5">
            <UserProfilePictureInputSection
              imagePreview={imagePreview}
              dataUserProfile={dataUserProfile}
              setFieldValue={setFieldValue}
              setImagePreview={setImagePreview}
            />
            <section className="flex flex-col gap-5">
              <UserProfileEmailInputSection
                newEmail={newEmail}
                setFieldValue={setFieldValue}
                mutateUpdateEmail={mutateUpdateEmail}
                setNewEmail={setNewEmail}
                isPendingUpdateEmail={isPendingUpdateEmail}
                setShowChangeEmail={setShowChangeEmail}
                dataUserProfile={dataUserProfile}
                showChangeEmail={showChangeEmail}
              />
              <UserProfileGeneralInfoInputSection />
              <UserProfileBirthDateInputSection />
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="address"
                  className="text-sm font-bold text-black ml-5"
                >
                  Address
                </label>
                <Field
                  as="textarea"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Jln MH Thamrin No. 8-10"
                  className="placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-3xl px-5 py-2"
                />
                <ErrorMessage
                  name="address"
                  component={'div'}
                  className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full"
                />
              </div>
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white rounded-3xl flex flex-col justify-between gap-3 p-5">
                  <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                    Are you sure you want to update your profile?
                  </h1>
                  <article className="text-sm font-medium text-gray-500">
                    Please review your information before submitting. Your
                    changes cannot be undone once saved.
                  </article>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitting(false)}
                      className="border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="z-20 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-90 transition duration-100 bg-blue-600 text-white text-sm font-bold px-5 py-3 shadow-md justify-center"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitting(true)}
                disabled={
                  isPendingUpdateUserProfile ||
                  isPendingUpdateEmail ||
                  isPendingUserProfile
                }
                className="transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-blue-800 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center"
              >
                <FaRegSave size={23} />
                Save Profile
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default ProfileUserPage
