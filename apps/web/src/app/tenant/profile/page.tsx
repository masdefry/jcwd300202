'use client'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import React from 'react'
import { FaRegSave } from 'react-icons/fa'
import { updateTenantProfileValidationSchema } from '@/features/tenant/profile/schemas/updateTenantProfileValidationSchema'
import TextInput from '@/features/user/profile/components/TextInput'
import useManageTenantProfileHook from '@/features/tenant/profile/hooks/useManageTenantProfileHook'
import EmailInputSection from '@/features/tenant/profile/components/EmailInputSection'
import UpdateProfileConfirmationPopup from '@/features/tenant/profile/components/UpdateProfileConfirmationPopup'
import TenantProfilePictureInputSection from '@/features/tenant/profile/components/TenantProfilePictureInputSection'

const ProfileTenantPage = () => {
  const {
    imagePreview,
    setImagePreview,
    dataTenantProfile,
    isPendingTenantProfile,
    showChangeEmail,
    setShowChangeEmail,
    newEmail,
    setNewEmail,
    isSubmitting,
    setIsSubmitting,
    mutateUpdateTenantProfilePicture,
    isPendingUpdateTenantProfilePicture,
    mutateUpdateEmail,
    isPendingUpdateEmail,
    mutateUpdateTenantProfile,
    isPendingUpdateTenantProfile,
  } = useManageTenantProfileHook()

  return (
    <main className="flex flex-col gap-5">
      <hgroup className="flex flex-col pb-5 border-b-4 border-slate-700">
        <h1 className="text-2xl font-bold text-gray-800">Account</h1>
        <p className="text-sm font-medium text-gray-500">Change your profile</p>
      </hgroup>
      <Formik
        initialValues={{
          file: [] as File[],
          email: dataTenantProfile?.email || '',
          pic: dataTenantProfile?.pic || '',
          phoneNumber: dataTenantProfile?.phoneNumber || '',
          address: dataTenantProfile?.address || '',
          companyName: dataTenantProfile?.companyName || '',
        }}
        validationSchema={updateTenantProfileValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          setIsSubmitting(true)
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="flex flex-col gap-5">
            <TenantProfilePictureInputSection
              imagePreview={imagePreview}
              dataTenantProfile={dataTenantProfile}
              setFieldValue={setFieldValue}
              setImagePreview={setImagePreview}
            />
            <section className="flex flex-col gap-5">
              <EmailInputSection
                dataTenantProfile={dataTenantProfile}
                setShowChangeEmail={setShowChangeEmail}
                setNewEmail={setNewEmail}
                showChangeEmail={showChangeEmail}
                newEmail={newEmail}
                isPendingUpdateEmail={isPendingUpdateEmail}
                mutateUpdateEmail={mutateUpdateEmail}
              />
              <TextInput
                type="text"
                name="companyName"
                title="Company Name"
                placeholder="Roomify Inc"
              />
              <TextInput
                type="text"
                name="pic"
                title="Person In Charge"
                placeholder="Roomify"
              />
              <TextInput
                type="text"
                name="phoneNumber"
                title="Phone Number"
                placeholder="08128192xxxxxx"
              />
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
                  className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                />
              </div>
              <UpdateProfileConfirmationPopup
                isPendingUpdateTenantProfilePicture={
                  isPendingUpdateTenantProfilePicture
                }
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                mutateUpdateTenantProfilePicture={
                  mutateUpdateTenantProfilePicture
                }
                mutateUpdateTenantProfile={mutateUpdateTenantProfile}
                values={values}
                isPendingUpdateTenantProfile={isPendingUpdateTenantProfile}
              />
              <button
                type="submit"
                disabled={
                  isPendingUpdateTenantProfile || isPendingTenantProfile
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

export default ProfileTenantPage
