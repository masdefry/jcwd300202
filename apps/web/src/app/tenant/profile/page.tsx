'use client'

import { Input } from '@/components/ui/input'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import React, { useState, useRef } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { FaRegSave } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { RiCloseCircleFill } from 'react-icons/ri'
import { updateTenantProfileValidationSchema } from '@/features/tenant/profile/schemas/updateTenantProfileValidationSchema'
import TextInput from '@/features/user/profile/components/TextInput'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'

const ProfileTenantPage = () => {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState('')
  const { data: dataTenantProfile, isPending: isPendingTenantProfile } =
    useQuery({
      queryKey: ['getTenantProfile'],
      queryFn: async () => {
        const res = await instance.get('/tenant')
        return res?.data?.data
      },
    })
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    mutate: mutateUpdateTenantProfilePicture,
    isPending: isPendingUpdateTenantProfilePicture,
  } = useMutation({
    mutationFn: async (fd) => {
      const res = await instance.patch('/tenant/profile-picture', fd)
      return res?.data
    },
    onSuccess: (res: any) => {
      console.log(res?.message)
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error')
    },
  })

  const { mutate: mutateUpdateEmail, isPending: isPendingUpdateEmail } =
    useMutation({
      mutationFn: async () => {
        const res = await instance.patch('/tenant/email', {
          email: newEmail,
        })
        console.log(res)
        return res?.data
      },
      onSuccess: (res) => {
        setShowChangeEmail(false)
        setNewEmail('')
        toast((t) => (
          <span className="flex gap-2 items-center font-semibold justify-center text-xs">
            {res?.message}
          </span>
        ))
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
    mutate: mutateUpdateTenantProfile,
    isPending: isPendingUpdateTenantProfile,
  } = useMutation({
    mutationFn: async ({
      email,
      pic,
      phoneNumber,
      address,
      companyName,
    }: any) => {
      const res = await instance.patch('/tenant', {
        email,
        pic,
        phoneNumber,
        address,
        companyName,
      })
      return res?.data
    },
    onSuccess: (res: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs text-red-600">
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    },
  })

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
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-5">
            <section className="flex sm:flex-row flex-col items-center gap-10 rounded-md p-5 border border-slate-300">
              <div className="flex flex-col gap-3 items-center">
                <figure className="overflow-hidden rounded-full h-[150px] w-[150px] bg-blue-300 border-2 border-slate-300">
                  <Image
                    src={imagePreview || dataTenantProfile?.profilePictureUrl}
                    width={500}
                    height={500}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </figure>
                {imagePreview && (
                  <p className="bg-slate-200 text-xs font-bold text-slate-600 p-1 rounded-md">
                    Preview
                  </p>
                )}
              </div>
              <hgroup className="flex flex-col">
                <h1 className="text-base font-bold text-gray-700 flex items-center gap-1.5">
                  Picture Profile
                  <AiOutlinePicture size={23} />
                </h1>
                <p className="text-sm font-medium text-gray-400">
                  This picture will be displayed on your Roomify account
                </p>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                  <label
                    htmlFor="file"
                    className="text-sm font-bold text-gray-800"
                  >
                    Change picture
                  </label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={(e: any) => {
                      setFieldValue(
                        'file',
                        Array.from(e.currentTarget.files || []),
                      )
                      if (e.currentTarget.files && e.currentTarget.files[0])
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                    }}
                    name="file"
                    className="hover:cursor-pointer"
                  />
                  <ErrorMessage
                    name="file"
                    component={'div'}
                    className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                  />
                </div>
              </hgroup>
            </section>
            <section className="flex flex-col gap-5">
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
                  <div
                    className="text-slate-600 px-5 text-xs italic font-medium mt-[-5px] p-1 rounded-full z-20"
                  >
                    If you change your email address, a verification link will be sent to the new email. Please check your inbox (and spam folder) to verify the change and complete the process.
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
                        <h1 className="text-lg font-bold text-slate-800">
                          Change Email
                        </h1>
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
                        Once you enter your new email address, we will send a
                        verification link to that address. Please check your
                        inbox and click the link to confirm your email change.
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
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
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
                      className="px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
              <button
                type="button"
                onClick={() => setIsSubmitting(true)}
                disabled={isPendingUpdateTenantProfile}
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
