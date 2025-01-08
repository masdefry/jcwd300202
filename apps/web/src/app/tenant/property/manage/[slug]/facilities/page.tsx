'use client'

import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsBuildingCheck, BsBuildingExclamation } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce'
import { Formik, Form, FieldArray } from 'formik'
import { FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci'

const PropertyManageFacilitiesPage = ({ params, searchParams }: { params: { slug: string }, searchParams: { name: string } }) => {
  const [ dataPropertyHasFacilities, setDataPropertyHasFacilities ] = useState<any>({
    propertyHasFacility: [],
    propertyNotHasFacility: [],
    propertyFacilitiesId: [],
    property: {}
  })
    const [ showMorePropertyNotHasFacility, setShowMorePropertyNotHasFacility ] = useState(false)
    const [ showMorePropertyHasFacility, setShowMorePropertyHasFacility ] = useState(false)
    const fetchPropertyHasFacilities = async() => {
      const res = await instance.get(`/property-has-facilities/${params?.slug}`)
      if(res.status === 200) {
        setDataPropertyHasFacilities(res?.data?.data)
      } else {
        toast.error('Connection error!')
      }
    }
  const [ isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
      fetchPropertyHasFacilities()
    }, [])
    const debounceSearchPropertyFacility = useDebouncedCallback((value) => {
      mutateSearchPropertyFacility(value)
    }, 500)

  const { mutate: mutateSearchPropertyFacility } = useMutation({
    mutationFn: async(value) => {
      const res = await instance.get(`/property-has-facilities/${params?.slug}?name=${value}`)
      setDataPropertyHasFacilities(res?.data?.data)
      return res?.data
    }
  })

  const { mutate: mutateUpdatePropertyHasFacilities, isPending: isPendingUpdatePropertyHasFacilities } = useMutation({
    mutationFn: async(values: { propertyFacilitiesId: number[] }) => {
      const res = await instance.put(`/property-has-facilities/${params?.slug}`, {
        propertyFacilitiesId: values.propertyFacilitiesId
      })
      return res?.data
    },
    onSuccess: (res) => {
      setIsSubmitting(false)
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs'>
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    },
    onError: (err: any) => {
      toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
    }
  })
  return (
    <main className='flex flex-col gap-7 py-5'>
      <hgroup className='flex flex-col px-5'>
        <h1 className='text-lg font-bold text-gray-800'>Facilities & Services</h1>
        <p className='text-sm font-medium text-slate-600'>Update Your Space: Let Us Know What You Need</p>

      </hgroup>
      <div className='flex flex-col px-5'>
        <input onChange={(e) => {
          searchParams.name = e.target.value
          if(e.target.value.length > 2) {
            debounceSearchPropertyFacility(e.target.value)
          } else {
            debounceSearchPropertyFacility('')
          }}
          } type="text" placeholder='Search facility ( minimum 2 or more characters )' className='px-5 rounded-full py-3 text-sm font-medium font-gray-800 w-full border-2 border-slate-300 bg-white placeholder-shown:text-sm' />
      </div>
      <Formik
      initialValues={{
        propertyFacilitiesId: dataPropertyHasFacilities?.propertyFacilitiesId || []
      }}

      enableReinitialize={true}
      onSubmit={(values) => {
        console.log(values)
        mutateUpdatePropertyHasFacilities(values)
      }}>
        {
          ({ values, setFieldValue }) => (
            <Form className='flex flex-col gap-7'>
          <FieldArray name='propertyFacilitiesId'>
            {
              ({ push, remove }) => (
                <div className='flex flex-col gap-7'>
                  <section className='px-5 flex flex-col gap-5'>
                    <h1 className='flex items-center gap-1.5 text-md font-bold text-gray-800'><BsBuildingCheck className='text-lg' />{dataPropertyHasFacilities?.property?.name} Does Have</h1>
                    <section className=' flex flex-col gap-3'>
                      { 
                        dataPropertyHasFacilities?.propertyHasFacility.slice(0, 5).map((item: any, index: number) => {
                          return (
                          <div key={index} className='flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white'>
                              <div className='flex items-center gap-1.5'>
                                <figure>
                                    <Image
                                    src={`http://localhost:5000/api/${item?.propertyFacility?.iconDirectory}/${item?.propertyFacility?.iconFilename}.${item?.propertyFacility?.iconFileExtension}`}
                                    width={100}
                                    height={100}
                                    alt=''
                                    className='h-4 w-4'
                                    />    
                                </figure>
                                <p className='text-sm font-medium text-gray-700'>{item?.propertyFacility?.name}</p>
                              </div>
                            <input type="checkbox" name='propertyFacilitiesId'
                            onChange={(e) => {
                              if(e.target.checked) {
                                push(item?.propertyFacility?.id)
                              } else {
                                const findIdIndex = values.propertyFacilitiesId.findIndex((itm: number) => itm === item?.propertyFacility?.id)
                                remove(findIdIndex)
                              }
                            }} className="toggle toggle-sm" defaultChecked />
                          </div>
                          )
                        })
                      }
                      {
                        (dataPropertyHasFacilities?.propertyHasFacility.length > 5 && !showMorePropertyHasFacility) && (
                          <div onClick={() => setShowMorePropertyHasFacility(true)} className='transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <CiSquarePlus className='text-base' />Show more facilities
                          </div>
                        )
                      } 
                      { 
                        showMorePropertyHasFacility && dataPropertyHasFacilities?.propertyHasFacility.slice(5, dataPropertyHasFacilities?.propertyHasFacility.length).map((item: any, index: number) => {
                          return (
                          <div key={index} className='flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white'>
                              <div className='flex items-center gap-1.5'>
                                <figure>
                                    <Image
                                    src={`http://localhost:5000/api/${item?.propertyFacility?.iconDirectory}/${item?.propertyFacility?.iconFilename}.${item?.propertyFacility?.iconFileExtension}`}
                                    width={100}
                                    height={100}
                                    alt=''
                                    className='h-4 w-4'
                                    />    
                                </figure>
                                <p className='text-sm font-medium text-gray-700'>{item?.propertyFacility?.name}</p>
                              </div>
                            <input type="checkbox" name='propertyFacilitiesId'
                            onChange={(e) => {
                              if(e.target.checked) {
                                push(item?.propertyFacility?.id)
                              } else {
                                const findIdIndex = values.propertyFacilitiesId.findIndex((itm: number) => itm === item?.propertyFacility?.id)
                                remove(findIdIndex)
                              }
                            }} className="toggle toggle-sm" defaultChecked />
                          </div>
                          )
                        })
                      }                                              
                      {
                        dataPropertyHasFacilities?.propertyHasFacility.length <= 0 && (
                          <div className='flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <IoSearchOutline className='text-base' />Property facility not found
                          </div>
                        )
                      }
                      {
                        showMorePropertyHasFacility && (
                          <div onClick={() => setShowMorePropertyHasFacility(false)} className='transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <CiSquareMinus className='text-base' />Show less facilities
                          </div>
                        )
                      }                        
                    </section>
                  </section>
                  <section className='px-5 flex flex-col gap-5'>
                    <h1 className='flex items-center gap-1.5 text-md font-bold text-gray-800'><BsBuildingExclamation className='text-lg' />{dataPropertyHasFacilities?.property?.name} Does Not Have</h1>
                    <section className=' flex flex-col gap-3'>
                      {
                        dataPropertyHasFacilities?.propertyNotHasFacility.slice(0, 5).map((item: any, index: number) => {
                          return (
                          <div key={index} className='flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white'>
                              <div className='flex items-center gap-1.5'>
                                <figure>
                                    <Image
                                    src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                    width={100}
                                    height={100}
                                    alt=''
                                    className='h-4 w-4'
                                    />    
                                </figure>
                                <p className='text-sm font-medium text-gray-700'>{item?.name}</p>
                              </div>
                            <input 
                            onChange={(e) => {
                              if(e.target.checked) {
                                push(item?.id)
                              } else {
                                const findIdIndex = values.propertyFacilitiesId.findIndex((itm: number) => itm === item?.id)
                                remove(findIdIndex)
                              }
                            }}
                            type="checkbox" className="toggle toggle-sm"/>
                          </div>
                          )
                        })
                      }
                      {
                        (dataPropertyHasFacilities?.propertyNotHasFacility.length > 5 && !showMorePropertyNotHasFacility) && (
                          <div onClick={() => setShowMorePropertyNotHasFacility(true)} className='transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <CiSquarePlus className='text-base' />Show more facilities
                          </div>
                        )
                      }                      
                      {
                        showMorePropertyNotHasFacility && dataPropertyHasFacilities?.propertyNotHasFacility.slice(5, dataPropertyHasFacilities?.propertyNotHasFacility.length).map((item: any, index: number) => {
                          return (
                          <div key={index} className='flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white'>
                              <div className='flex items-center gap-1.5'>
                                <figure>
                                    <Image
                                    src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                    width={100}
                                    height={100}
                                    alt=''
                                    className='h-4 w-4'
                                    />    
                                </figure>
                                <p className='text-sm font-medium text-gray-700'>{item?.name}</p>
                              </div>
                            <input 
                            onChange={(e) => {
                              if(e.target.checked) {
                                push(item?.id)
                              } else {
                                const findIdIndex = values.propertyFacilitiesId.findIndex((itm: number) => itm === item?.id)
                                remove(findIdIndex)
                              }
                            }}
                            type="checkbox" className="toggle toggle-sm"/>
                          </div>
                          )
                        })
                      }
                      {
                        dataPropertyHasFacilities?.propertyNotHasFacility.length <= 0 && (
                          <div className='flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <IoSearchOutline className='text-base' />Property facility not found
                          </div>
                        )
                      }
                      {
                        showMorePropertyNotHasFacility && (
                          <div onClick={() => setShowMorePropertyNotHasFacility(false)} className='transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white'>
                            <CiSquareMinus className='text-base' />Show less facilities
                          </div>
                        )
                      }
                    </section>
                  </section>
                </div>
              )
            }
          </FieldArray>
          <section className='px-5'>
            <button type='button' disabled={isPendingUpdatePropertyHasFacilities} onClick={() => setIsSubmitting(true)} className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:cursor-not-allowed bg-blue-800 text-sm rounded-full w-full px-5 py-3 flex gap-1.5 items-center justify-center font-bold text-white hover:opacity-75 transition duration-100 active:scale-95'>
              <FiSend className='text-base'/>Update
            </button>
          </section>
          <div className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}>
            <div className='bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5'>
              <h1 className='text-lg font-bold text-slate-800 pb-2 border-b border-slate-300'>
              Are you sure you want to update your property facilities?
              </h1>
              <article className='text-sm font-medium text-gray-500'>
              By confirming, your requested updates will be submitted for review. You can always make changes later.
              </article>
              <div className='flex items-center justify-end gap-2'>
                <button type='button' onClick={() => setIsSubmitting(false)} className='px-5 hover:bg-slate-200 transition duration-100 active:scale-90 py-1.5 text-gray-700 text-sm font-bold rounded-full shadow-md border border-slate-100 '>Cancel</button>
                <button type='submit' disabled={isPendingUpdatePropertyHasFacilities} className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100'>Confirm</button>
              </div>
            </div>
          </div>
          </Form>
            )
        }
      </Formik>
    </main>
  )
}

export default PropertyManageFacilitiesPage
