'use client'

import { Input } from '@/components/ui/input'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import React, { useState, useRef } from 'react'
import { PiCityLight } from "react-icons/pi";
import { AiOutlinePicture } from 'react-icons/ai'
import { FaRegSave } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/utils/axiosInstance'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useDebouncedCallback } from 'use-debounce'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { IoBusinessOutline, IoClose } from 'react-icons/io5'
import { RiCloseCircleFill } from 'react-icons/ri'
import { updateUserProfileValidationSchema } from '@/features/user/profile/schemas/updateUserProfileValidationSchema'

const ProfileUserPage = () => {
  const [ imagePreview, setImagePreview ] = useState('')
  const [ updatedCity, setUpdatedCity ] = useState('') 
  const [ updatedCityInput, setUpdatedCityInput ] = useState('')
  const [ dataCityList, setDataCityList ] = useState([])
  const [ updatedCountry, setUpdatedCountry ] = useState('') 
  const [ updatedCountryInput, setUpdatedCountryInput ] = useState('')
  const [ dataCountryList, setDataCountryList ] = useState([])
  const [ showChangeEmail, setShowChangeEmail ] = useState(false)
  const [ newEmail, setNewEmail ] = useState('')
  const { data: dataUserProfile, isPending: isPendingUserProfile } = useQuery({
    queryKey: ['getUserProfile'],
    queryFn: async() => {
      const res = await instance.get('/user')
      return res?.data?.data
    }
  })

  const [ cityChip, setCityChip ] = useState(true)
  const [ countryChip, setCountryChip ] = useState(true)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { mutate: mutateUpdateUserProfilePicture, isPending: isPendingUpdateUserProfilePicture } = useMutation({
    mutationFn: async(fd) => {
      const res = await instance.patch('/user/profile-picture', fd) 
      return res?.data
    },
    onSuccess: (res: any) => {
      console.log(res?.message)
    },
    onError: (err: any) => {
      console.log(err?.response?.data?.message || 'Connection error')
    }
  })

  const { mutate: mutateUpdateEmail, isPending: isPendingUpdateEmail } = useMutation({
    mutationFn: async() => {
      const res = await instance.patch('/user/email', {
        email: newEmail
      })
      console.log(res)
      return res?.data
    },
    onSuccess: (res) => {
      setShowChangeEmail(false)
      setNewEmail('')
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Connection error')
    }
  })

  const { mutate: mutateUpdateUserProfile, isPending: isPendingUpdateUserProfile } = useMutation({
    mutationFn: async({
      email,
      username,
      gender,
      phoneNumber,
      cityName,
      countryName,
      cityId,
      countryId,
      date,
      month,
      year,
      address
    }: any) => {
      const res = await instance.patch('/user', {
        email,
        username,
        gender,
        phoneNumber,
        cityName,
        countryName,
        cityId,
        countryId,
        date,
        month,
        year,
        address
      }) 
      return res?.data
    },
    onSuccess: (res: any) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Connection error')
    }
  })

  const { mutate: mutateCityList } = useMutation({
    mutationFn: async(value: string) => {
      const res = await instance.get(`/city?cityName=${value}`)
      setDataCityList(res?.data?.data?.cities)
      return res?.data
    }
  })

  const debounceCityList = useDebouncedCallback((value) => {
    mutateCityList(value)
  }, 200)

  const { mutate: mutateCountryList } = useMutation({
    mutationFn: async(value: string) => {
      const res = await instance.get(`/country?countryName=${value}`)
      setDataCountryList(res?.data?.data?.countries)
      return res?.data
    }
  })

  const debounceCountryList = useDebouncedCallback((value) => {
    mutateCountryList(value)
  }, 200)

  return (
    <main className='flex flex-col gap-5'>
      <hgroup className='flex flex-col pb-5 border-b-4 border-slate-700'>
        <h1 className='text-2xl font-bold text-gray-800'>Account</h1>
        <p className='text-sm font-medium text-gray-500'>Change your profile</p>
      </hgroup>
      <Formik
      initialValues={{
        file: [] as File[],
        email: dataUserProfile?.email || '',
        username: dataUserProfile?.username || '',
        gender: dataUserProfile?.gender || '',
        phoneNumber: dataUserProfile?.phoneNumber || '',
        cityName: dataUserProfile?.cityName || '',
        countryName: dataUserProfile?.countryName || '',
        cityId: dataUserProfile?.cityId || 0,
        countryId: dataUserProfile?.countryId || 0,
        date: dataUserProfile?.date ? dataUserProfile?.date : null,
        month: dataUserProfile?.month ? dataUserProfile?.month : null,
        year: dataUserProfile?.year ? dataUserProfile?.year : null,
        address: dataUserProfile?.address || ''
      }}
      validationSchema={updateUserProfileValidationSchema}
      enableReinitialize={true}
      onSubmit={(values) => {
        console.log(values.month)
        console.log('asa')
        setIsSubmitting(false)
        const fd: any = new FormData()
        fd.append('images', values?.file[0])
        mutateUpdateUserProfilePicture(fd)
        mutateUpdateUserProfile({
          email: values.email,
          username: values.username,
          gender: values.gender,
          phoneNumber: values.phoneNumber,
          cityName: values.cityName,
          countryName: values.countryName,
          cityId: values.cityId,
          countryId: values.countryId,
          date: values.date,
          month: values.month,
          year: values.year,
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
                    src={imagePreview || dataUserProfile?.profilePictureUrl}
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
                <div className='flex items-end gap-3'>
                  <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="email" className='text-sm font-bold text-black ml-5 flex items-center gap-1'>
                      Email
                      {
                        dataUserProfile?.isVerified ? (
                          <MdVerified className='text-blue-600' size={13}/>
                        ) : (
                          <RiCloseCircleFill className='text-red-600' size={13}/>
                        )
                      }
                    </label>
                    <Field id='email' name='email' type="email" disabled placeholder='mfauzi@gmail.com' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                    <ErrorMessage name='email' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                  </div>
                  <button type='button' onClick={() => {setShowChangeEmail(true)}} className='px-5 py-2 font-bold hover:opacity-70 active:scale-90 transition duration-100 text-sm bg-gray-900 text-white w-fit border border-gray-900 rounded-full'>Change</button>
                  {
                    showChangeEmail && (
                      <section className='fixed bg-black bg-opacity-20 backdrop-blur-sm w-full h-full z-[51] top-0 left-0 flex items-center justify-center'>
                        <div className='bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-7'>
                          <div className='flex items-center justify-end'><IoClose className='hover:opacity-75 hover:cursor-pointer text-gray-900 ' onClick={() => setShowChangeEmail(false)} /></div>
                          <hgroup className='flex flex-col mt-[-10px]'>
                            <h1 className='text-lg font-bold text-slate-800'>Change Email</h1>
                            <p className='text-sm font-light text-gray-500'>Switch to a New Email Address</p>
                          </hgroup>
                          <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1 '>
                              <label className='text-sm font-bold text-black ml-5'>Current Email</label>
                              <Field name='email' disabled={true} type='email' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                              <ErrorMessage name='propertyTypeName' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                            </div>
                            <div className='flex flex-col gap-1 '>
                              <label className='text-sm font-bold text-black ml-5'>New Email</label>
                              <Field id='newEmail' value={newEmail} onChange={(e: any) => setNewEmail(e.target.value)} name='newEmail' type='email' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                              <ErrorMessage name='newEmail' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                            </div>
                          </div>
                          <article className='text-sm font-medium italic max-w-[400px] text-center'>
                          Once you enter your new email address, we will send a verification link to that address. Please check your inbox and click the link to confirm your email change.
                          </article>
                          <div className='flex items-center gap-2 justify-end'>
                            <button type='button' onClick={() => setShowChangeEmail(false)} className='px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 '>Cancel</button>
                            <button type='button' onClick={() => mutateUpdateEmail()} disabled={isPendingUpdateEmail} className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-gray-900 border-slate-100 '>Update</button>
                          </div>
                        </div>
                      </section>
                    )
                  }
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="username" className='text-sm font-bold text-black ml-5'>Name</label>
                  <Field id='username' name='username' type="text" placeholder='Roomify' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                  <ErrorMessage name='username' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="phoneNumber" className='text-sm font-bold text-black ml-5'>Phone Number</label>
                  <Field id='phoneNumber' name='phoneNumber' type="text" placeholder='08128192xxxxxx ' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                  <ErrorMessage name='phoneNumber' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="gender" className='text-sm font-bold text-black ml-5'>Gender</label>
                  <Field as='select' name='gender' defaultValue='select-gender' className="bg-white border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value='select-gender'>Select a gender</option>
                      <option value='MALE'>Male</option>
                      <option value='FEMALE'>Female</option>
                  </Field>
                  <ErrorMessage name='gender' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="country" className='text-sm font-bold text-black ml-5'>Birthdate</label>
                  <div id='birthdate-section' className='flex items-center gap-2'>
                    <div className='w-full flex flex-col gap-1'>
                      <Field as='select' name='date' defaultValue='select-date' className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='select-date'>Date</option>
                        {
                          Array.from({length: 31}).map((_, index) => {
                            return(
                              <option key={index} value={index + 1}>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</option>
                            )
                          })
                        }      
                      </Field>
                      <ErrorMessage name='date' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                      <Field as='select' name='month' defaultValue='select-month' className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='select-month'>Month</option>
                        {
                          Array.from({length: 12}).map((_, index) => {
                            return(
                              <option key={index} value={index + 1}>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</option>
                            )
                          })
                        }      
                      </Field>
                      <ErrorMessage name='month' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                      <Field as='select' name='year' defaultValue='select-year' className="bg-white hover:cursor-pointer border w-full border-slate-300 text-gray-800 text-sm font-semibold rounded-full  px-5 py-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='select-year'>Year</option>
                        {
                          Array.from({length: 100}).map((_, index) => {
                            return(
                              <option key={index} value={( new Date().getFullYear() - index ) - 1}>{( new Date().getFullYear() - index ) - 1}</option>
                            )
                          })
                        }      
                      </Field>
                      <ErrorMessage name='year' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-1 relative'>
                  <label htmlFor="cityId" className='text-sm font-bold text-black ml-5'>City</label>
                  { 
                    ((updatedCity || dataUserProfile?.cityName) && cityChip) && (
                      <div className='absolute top-[29px] left-[6px] rounded-full px-3 py-1 text-gray-800 text-sm font-bold bg-gray-200 flex items-center gap-1.5'><PiCityLight size={20}/>{updatedCity || dataUserProfile?.cityName}
                      <IoIosCloseCircleOutline onClick={() => {
                        setCityChip(false)
                        setUpdatedCity('')
                        setDataCityList([])
                        }} size={19} className='ml-3 hover:cursor-pointer'/>
                      </div>
                    )
                  }
                  <div className='flex items-center w-full'>
                    <input value={updatedCityInput} onChange={(e) => {
                      setUpdatedCityInput(e.target.value)
                      debounceCityList(e.target.value)
                      setDataCountryList([])
                      }} 
                      disabled={cityChip && dataUserProfile?.cityName} id='cityId' name='cityId' type="text" placeholder={cityChip ? '' : 'Jakarta'} className='placeholder-shown:text-sm w-full placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-l-full px-5 py-2' />
                    <button onClick={() => {
                      if(updatedCityInput) {
                        setCityChip(true)
                        setUpdatedCity(updatedCityInput)
                        setFieldValue('cityName', updatedCityInput)
                        setDataCityList([])
                        setUpdatedCityInput('')
                      }
                      }} 
                      type='button' className='text-white border hover:opacity-75 border-black bg-black min-w-max text-sm font-bold px-5 py-2 rounded-r-full'>Set</button>
                  </div>
                  {
                    (dataCityList && dataCityList.length > 0) && (
                    <div className='absolute top-16 w-full rounded-md hover:cursor-pointer bg-white shadow-md border border-slate-100 flex flex-col overflow-hidden z-30'>
                      {
                        dataCityList?.map((item: any, index: number) => {
                          return(
                            <p 
                            key={index} 
                            onClick={() => {
                              setFieldValue('cityId', item?.id)
                              setUpdatedCity(item?.name)
                              setCityChip(true)
                              setDataCityList([])
                              setUpdatedCityInput('')
                            }} 
                            className='px-5 py-2 text-sm font-bold text-gray-800 hover:bg-blue-600 hover:text-white rounded-md'>
                              {item?.name}
                            </p>
                          )
                        })
                      }

                    </div>
                    )
                   }
                   <ErrorMessage name='cityName' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className='flex flex-col gap-1 relative'>
                  <label htmlFor="countryId" className='text-sm font-bold text-black ml-5'>Country</label>
                  { 
                    ((updatedCountry || dataUserProfile?.countryName) && countryChip) && (
                      <div className='absolute top-[29px] left-[6px] rounded-full px-3 py-1 text-gray-800 text-sm font-bold bg-gray-200 flex items-center gap-1.5'><IoBusinessOutline size={20}/>{updatedCountry || dataUserProfile?.countryName}
                      <IoIosCloseCircleOutline onClick={() => {
                        setCountryChip(false)
                        setUpdatedCountry('')
                        setDataCountryList([])
                        }} size={19} className='ml-3 hover:cursor-pointer'/>
                      </div>
                    )
                  }
                  <div className='flex items-center w-full'>
                    <input value={updatedCountryInput} onChange={(e) => {
                      setUpdatedCountryInput(e.target.value)
                      debounceCountryList(e.target.value)
                      setDataCityList([])
                      }} 
                      disabled={countryChip && dataUserProfile?.countryName} id='countryId' name='countryId' type="text" placeholder={countryChip ? '' : 'Jakarta'} className='placeholder-shown:text-sm w-full placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-l-full px-5 py-2' />
                    <button onClick={() => {
                      if(updatedCountryInput) {
                        setCountryChip(true)
                        setUpdatedCountry(updatedCountryInput)
                        setFieldValue('countryName', updatedCountryInput)
                        setDataCountryList([])
                        setUpdatedCountryInput('')
                      }
                      }} 
                      type='button' className='text-white border hover:opacity-75 border-black bg-black min-w-max text-sm font-bold px-5 py-2 rounded-r-full'>Set</button>
                  </div>
                  {
                    (dataCountryList && dataCountryList.length > 0) && (
                    <div className='absolute top-16 w-full rounded-md hover:cursor-pointer bg-white shadow-md border border-slate-100 flex flex-col overflow-hidden z-30'>
                      {
                        dataCountryList?.map((item: any, index: number) => {
                          return(
                            <p 
                            key={index} 
                            onClick={() => {
                              setFieldValue('countryId', item?.id)
                              setUpdatedCountry(item?.name)
                              setCountryChip(true)
                              setDataCountryList([])
                              setUpdatedCountryInput('')
                            }} 
                            className='px-5 py-2 text-sm font-bold text-gray-800 hover:bg-blue-600 hover:text-white rounded-md'>
                              {item?.name}
                            </p>
                          )
                        })
                      }

                    </div>
                    )
                   }
                   <ErrorMessage name='countryName' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label htmlFor="address" className='text-sm font-bold text-black ml-5'>Address</label>
                  <Field as='textarea' id='address' name='address' type="text" placeholder='Jln MH Thamrin No. 8-10' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-3xl px-5 py-2' />
                  <ErrorMessage name='address' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full'/>
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
                <button type='button' onClick={() => setIsSubmitting(true)} disabled={isPendingUpdateUserProfile} className='transition duration-100 disabled:bg-slate-300 disabled:hover:opacity-100 disabled:active:scale-100 disabled:text-slate-500 flex items-center gap-1.5 rounded-full hover:opacity-75 active:scale-95 bg-blue-600 text-white text-sm font-bold px-5 py-3 shadow-md w-full justify-center'><FaRegSave size={23}/>Save Profile</button>
              </section>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}

export default ProfileUserPage
