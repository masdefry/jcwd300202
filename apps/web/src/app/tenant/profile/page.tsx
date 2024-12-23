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

const ProfileTenantPage = () => {
  const [ imagePreview, setImagePreview ] = useState('')
  const { data: dataTenantProfile, isPending: isPendingTenantProfile } = useQuery({
    queryKey: ['getTenantProfile'],
    queryFn: async() => {
      console.log('USEQUERY')
      const res = await instance.get('/tenant')
      console.log(res)
      return res?.data?.data
    }
  })

  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { mutate: mutateUpdateTenantProfilePicture, isPending: isPendingUpdateTenantProfilePicture } = useMutation({
    mutationFn: async(fd) => {
      const res = await instance.patch('/tenant/profile-picture', fd) 
      return res?.data
    },
    onSuccess: (res: any) => {
      console.log(res?.message)
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error')
    }
  })

  const { mutate: mutateUpdateTenantProfile, isPending: isPendingUpdateTenantProfile } = useMutation({
    mutationFn: async({
      email,
      pic,
      phoneNumber,
      address 
    }: any) => {
      const res = await instance.patch('/tenant', {
        email,
        pic,
        phoneNumber,
        address 
      }) 
      return res?.data
    },
    onSuccess: (res: any) => {
      toast.success(res?.message)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Connection error')
    }
  })

  return (
    <main className='flex flex-col gap-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Account</h1>
        <p className='text-sm font-medium text-gray-500'>Change your profile</p>
      </hgroup>
      <Formik
      initialValues={{
        file: [] as File[],
        email: dataTenantProfile?.email || '',
        pic: dataTenantProfile?.pic || '',
        phoneNumber: dataTenantProfile?.phoneNumber || '',
        address: dataTenantProfile?.address || ''
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
          address: values.address
        })
      }}
      >
        {
          ({setFieldValue}) => (
            <Form className='flex flex-col gap-5'>
              <section className='flex items-center gap-10 rounded-md p-5 px-10 border border-slate-300'>
                <div className='flex flex-col gap-3 items-center'>
                  <figure className='overflow-hidden rounded-full h-[150px] w-[150px] bg-blue-300 border-2 border-slate-300'>
                    <Image
                    src={imagePreview || dataTenantProfile?.profilePictureUrl}
                    width={500}
                    height={500}
                    alt='' 
                    className='w-full h-full object-cover'
                    />
                  </figure>
                  {
                    imagePreview && (
                      <p className='bg-slate-200 text-xs font-bold text-slate-600 p-1 rounded-md'>Preview</p>
                    )
                  }
                </div>
                <hgroup className='flex flex-col'>
                  <h1 className='text-base font-bold text-gray-700 flex items-center gap-1.5'>Picture Profile<AiOutlinePicture size={23}/></h1>
                  <p className='text-sm font-medium text-gray-400'>This picture will be displayed on your Roomify account</p>
                  <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
                  <label htmlFor="file" className='text-sm font-bold text-gray-800'>Change picture</label>
                  <Input id="picture" type="file" onChange={
                  (e: any) => {
                    setFieldValue('file', Array.from(e.currentTarget.files || []))
                    if(e.currentTarget.files && e.currentTarget.files[0])
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                  }
                  name='file' className='hover:cursor-pointer'/>
                  <ErrorMessage name='file' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                  </div>
                </hgroup>
              </section>
              <section className='flex flex-col gap-5'>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="email" className='text-sm font-bold text-black ml-5 flex items-center gap-1'>
                    Email
                    {
                      dataTenantProfile?.isVerified ? (
                        <MdVerified className='text-blue-600' size={13}/>
                      ) : (
                        <RiCloseCircleFill className='text-red-600' size={13}/>
                      )
                    }
                  </label>
                  <Field id='email' name='email' type="email" disabled placeholder='mfauzi@gmail.com' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                  <ErrorMessage name='email' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="pic" className='text-sm font-bold text-black ml-5'>Person in Charge</label>
                  <Field id='pic' name='pic' type="text" placeholder='Roomify' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                  <ErrorMessage name='pic' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="phoneNumber" className='text-sm font-bold text-black ml-5'>Phone Number</label>
                  <Field id='phoneNumber' name='phoneNumber' type="text" placeholder='08128192xxxxxx ' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                  <ErrorMessage name='phoneNumber' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="address" className='text-sm font-bold text-black ml-5'>Address</label>
                  <Field as='textarea' id='address' name='address' type="text" placeholder='Jln MH Thamrin No. 8-10' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-3xl px-5 py-2' />
                  <ErrorMessage name='address' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className={`${!isSubmitting && 'hidden'} backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}>
                  <div className='bg-white rounded-3xl flex flex-col justify-between gap-3 p-5'>
                    <h1 className='text-lg font-bold text-gray-800 pb-2 border-b border-b-slate-300'>
                    Are you sure you want to update your profile?
                    </h1>
                    <article className='text-base font-light text-gray-700'>
                      Please review your information before submitting.
                      Your changes cannot be undone once saved.
                    </article>
                    <div className='flex items-center justify-end gap-2'>
                      <button type='button' onClick={() => setIsSubmitting(false)} className='border border-slate-100 box-border flex items-center gap-1.5 rounded-full hover:opacity-75 hover:bg-slate-200 active:scale-90 transition duration-100 bg-white text-gray-800 text-sm font-bold px-5 py-3 shadow-md justify-center'>Cancel</button>
                      <button type='submit' className='z-20 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-90 transition duration-100 bg-blue-600 text-white text-sm font-bold px-5 py-3 shadow-md justify-center'>Confirm</button>
                    </div>
                  </div>
                </div>
                <button type='button' onClick={() => setIsSubmitting(true)} disabled={isPendingUpdateTenantProfile} className='transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-blue-600 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center'><FaRegSave size={23}/>Save Profile</button>
              </section>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}

export default ProfileTenantPage
