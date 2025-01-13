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
import { manageRoomAmenitiesValidationSchema } from '@/features/tenant/property/manage/room-amenities/schemas/manageRoomAmenitiesValidationSchema'

const PropertyManageRoomAmenitiesPage = ({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { name: string }
}) => {
  const [dataGeneralRoomFacilities, setDataGeneralRoomFacilities] =
    useState<any>()
  const [showMoreRoomNotHasFacilities, setShowMoreRoomNotHasFacilities] =
    useState(false)
  const [showMoreRoomHasFacilities, setShowMoreRoomHasFacilities] =
    useState(false)
  const [selectRoom, setSelectRoom] = useState<null | string>('all-rooms')
  const fetchPropertyHasFacilities = async () => {
    const res = await instance.get(
      `/room-has-facilities/property/${params?.slug}`,
    )
    if (res.status === 200) {
      setDataGeneralRoomFacilities(res?.data?.data)
    } else {
      toast.error('Connection error!')
    }
  }
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchPropertyHasFacilities()
  }, [])
  
  const { mutate: mutateSearchRoomFacility } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(
        `/room-has-facilities/${selectRoom}?name=${value}`,
      )
      setDataGeneralRoomFacilities(res?.data?.data)
      return res?.data
    },
  })
  const debounceSearchRoomFacility = useDebouncedCallback((value) => {
    mutateSearchRoomFacility(value)
  }, 500)

  
  const { mutate: mutateSearchGeneralRoomFacility } = useMutation({
    mutationFn: async (value: string) => {
      const res = await instance.get(
        `/room-has-facilities/property/${params?.slug}?name=${value}`,
      )
      setDataGeneralRoomFacilities(res?.data?.data)
      return res?.data
    },
  })
  const debounceSearchGeneralRoomFacility = useDebouncedCallback((value) => {
    mutateSearchGeneralRoomFacility(value)
  }, 500)
  
  const { mutate: mutateRoomFacilityByRoom } = useMutation({
    mutationFn: async (value) => {
      const res = await instance.get(
        `/room-has-facilities/${selectRoom}`,
      )
      setDataGeneralRoomFacilities(res?.data?.data)
      return res?.data
    },
  })

  const {
    mutate: mutateUpdateRoomHasFacilities,
    isPending: isPendingUpdateRoomHasFacilities,
  } = useMutation({
    mutationFn: async (values: { propertyRoomFacilitiesId: number[] }) => {
      const res = await instance.put(
        `/room-has-facilities/${selectRoom}`,
        {
          propertyRoomFacilitiesId: values.propertyRoomFacilitiesId,
        },
      )
      return res?.data
    },
    onSuccess: (res) => {
      setIsSubmitting(false)
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
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
    mutate: mutateUpdateGeneralRoomFacilities,
    isPending: isPendingUpdateGeneralRoomFacilities,
  } = useMutation({
    mutationFn: async (values: { propertyRoomFacilitiesId: number[] }) => {
      const res = await instance.put(
        `/room-has-facilities/property/${params?.slug}`,
        {
          propertyRoomFacilitiesId: values.propertyRoomFacilitiesId,
        },
      )
      return res?.data
    },
    onSuccess: (res) => {
      toast((t) => (
        <span className="flex gap-2 items-center font-semibold justify-center text-xs">
          {res?.message}
        </span>
      ))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
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
    <main className="flex flex-col gap-7 py-5">
      <hgroup className="flex flex-col px-5">
        <h1 className="text-lg font-bold text-gray-800">Room Amenities</h1>
        <p className="text-sm font-medium text-slate-600">
          Your Room, Your Way: Effortlessly Customize Amenities to Suit Your
          Style!
        </p>
      </hgroup>
      <section className="flex items-center gap-5 px-5">
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="select-room"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Select Room:
          </label>
          <select
            onChange={(e) => {
              setSelectRoom((state) => {
                state = e.target.value
                return state
              })
              if(e.target.value !== 'all-rooms') {
                mutateSearchRoomFacility('')
              } else {
                mutateSearchGeneralRoomFacility('')
              }
            }}
            name="select-room"
            defaultValue="all-rooms"
            id="select-room"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all-rooms">All Room Types</option>
            {dataGeneralRoomFacilities?.property?.propertyRoomType?.map(
              (item: any, index: number) => {
                return <option value={item?.id}>{item?.name}</option>
              },
            )}
          </select>
        </span>
      </section>
      <div className="flex flex-col px-5">
        <input
          onChange={(e) => {
            searchParams.name = e.target.value
            if(selectRoom !== 'all-rooms') {
              if (e.target.value.length > 2) {
                debounceSearchRoomFacility(e.target.value)
              } else {
                debounceSearchRoomFacility('')
              }
            } else {
              if (e.target.value.length > 2) {
                debounceSearchGeneralRoomFacility(e.target.value)
              } else {
                debounceSearchGeneralRoomFacility('')
              }
            }
          }}
          type="text"
          placeholder="Search facility ( minimum 2 or more characters )"
          className="px-5 rounded-full py-3 text-sm font-medium font-gray-800 w-full border-2 border-slate-300 bg-white placeholder-shown:text-sm"
        />
      </div>
      <Formik
        initialValues={{
          propertyRoomFacilitiesId:
            dataGeneralRoomFacilities?.propertyRoomFacilitiesId || [],
        }}
        validationSchema={manageRoomAmenitiesValidationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          setIsSubmitting(false) 
          if (selectRoom === 'all-rooms') {
            mutateUpdateGeneralRoomFacilities(values)
          } else {
            mutateUpdateRoomHasFacilities(values)
          }
        }}
      >
        {({ values, setFieldValue, isValid }) => {
          if(!isValid) setIsSubmitting(false) 
          return (
            <Form className="flex flex-col gap-7">
              <FieldArray name="propertyRoomFacilitiesId">
                {({ push, remove }) => (
                  <div className="flex flex-col gap-7">
                    <section className="px-5 flex flex-col gap-5">
                      {
                        selectRoom === 'all-rooms' ? (
                        <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                          <BsBuildingCheck className="text-lg" />
                          {dataGeneralRoomFacilities?.property?.name} Rooms Does
                          Have
                        </h1>
                        ) : (
                        <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                          <BsBuildingCheck className="text-lg" />
                          {dataGeneralRoomFacilities?.propertyRoomType?.name} Room Type Does
                          Have
                        </h1>
  
                        )
  
                      }
                      <section className=" flex flex-col gap-3">
                        {dataGeneralRoomFacilities?.roomHasFacilities
                          ?.slice(0, 5)
                          ?.map((item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                              >
                                <div className="flex items-center gap-1.5">
                                  <figure>
                                    <Image
                                      src={`http://localhost:5000/api/${item?.iconDirectory || item?.propertyRoomFacility?.iconDirectory}/${item?.iconFilename || item?.propertyRoomFacility?.iconFilename}.${item?.iconFileExtension || item?.propertyRoomFacility?.iconFileExtension}`}
                                      width={100}
                                      height={100}
                                      alt=""
                                      className="h-4 w-4"
                                    />
                                  </figure>
                                  <p className="text-sm font-medium text-gray-700">
                                    {item?.name || item?.propertyRoomFacility?.name}
                                  </p>
                                </div>
                                <input
                                  type="checkbox"
                                  name="propertyRoomFacilitiesId"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      push(item?.id || item?.propertyRoomFacility?.id)
                                    } else {
                                      const findIdIndex = item?.propertyRoomFacility?.id ?
                                      (values.propertyRoomFacilitiesId.findIndex(
                                        (itm: number) => (itm === item?.propertyRoomFacility?.id),
                                      )) :
                                      (values.propertyRoomFacilitiesId.findIndex(
                                        (itm: number) => (itm === item?.id),
                                      ))
                                      remove(findIdIndex)
                                    }
                                  }}
                                  className="toggle toggle-sm"
                                  defaultChecked
                                />
                              </div>
                            )
                          })}
                        {(dataGeneralRoomFacilities?.roomHasFacilities?.length >
                          5 &&
                          !showMoreRoomHasFacilities) && (
                            <div
                              onClick={() => setShowMoreRoomHasFacilities(true)}
                              className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                            >
                              <CiSquarePlus className="text-base" />
                              Show more facilities
                            </div>
                          )}
                        {showMoreRoomHasFacilities &&
                          dataGeneralRoomFacilities?.roomHasFacilities
                            ?.slice(
                              5,
                              dataGeneralRoomFacilities?.roomHasFacilities
                                ?.length,
                            )
                            ?.map((item: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <figure>
                                      <Image
                                        src={`http://localhost:5000/api/${item?.iconDirectory || item?.propertyRoomFacility?.iconDirectory}/${item?.iconFilename || item?.propertyRoomFacility?.iconFilename}.${item?.iconFileExtension || item?.propertyRoomFacility?.iconFileExtension}`}
                                        height={100}
                                        width={100}
                                        alt=""
                                        className="h-4 w-4"
                                      />
                                    </figure>
                                    <p className="text-sm font-medium text-gray-700">
                                      {item?.name || item?.propertyRoomFacility?.name}
                                    </p>
                                  </div>
                                  <input
                                    type="checkbox"
                                    name="propertyRoomFacilitiesId"
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        push(item?.id || item?.propertyRoomFacility?.id)
                                      } else {
                                        const findIdIndex = item?.propertyRoomFacility?.id ?
                                          (values.propertyRoomFacilitiesId.findIndex(
                                            (itm: number) => (itm === item?.propertyRoomFacility?.id),
                                          )) :
                                          (values.propertyRoomFacilitiesId.findIndex(
                                            (itm: number) => (itm === item?.id),
                                          ))
                                        remove(findIdIndex)
                                      }
                                    }}
                                    className="toggle toggle-sm"
                                    defaultChecked
                                  />
                                </div>
                              )
                            })}
                        {dataGeneralRoomFacilities?.roomHasFacilities?.length <=
                          0 && (
                          <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
                            <IoSearchOutline className="text-base" />
                            General room facility not found
                          </div>
                        )}
                        {showMoreRoomHasFacilities && (
                          <div
                            onClick={() => setShowMoreRoomHasFacilities(false)}
                            className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                          >
                            <CiSquareMinus className="text-base" />
                            Show less facilities
                          </div>
                        )}
                      </section>
                    </section>
                    <section className="px-5 flex flex-col gap-5">
                      {
                        selectRoom === 'all-rooms' ? (
                        <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                          <BsBuildingExclamation className="text-lg" />
                          {dataGeneralRoomFacilities?.property?.name} Rooms Does Not
                          Have
                        </h1>
                        ) : (
                        <h1 className="flex items-center gap-1.5 text-md font-bold text-gray-800">
                          <BsBuildingExclamation className="text-lg" />
                          {dataGeneralRoomFacilities?.propertyRoomType?.name} Room Type Does Not
                          Have
                        </h1>
  
                        )
  
                      }
                      <section className=" flex flex-col gap-3">
                        {dataGeneralRoomFacilities?.roomNotHasFacilities
                          ?.slice(0, 5)
                          ?.map((item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                              >
                                <div className="flex items-center gap-1.5">
                                  <figure>
                                    <Image
                                      src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                      width={100}
                                      height={100}
                                      alt=""
                                      className="h-4 w-4"
                                    />
                                  </figure>
                                  <p className="text-sm font-medium text-gray-700">
                                    {item?.name}
                                  </p>
                                </div>
                                <input
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      push(item?.id)
                                    } else {
                                      const findIdIndex =
                                        values.propertyRoomFacilitiesId.findIndex(
                                          (itm: number) => itm === item?.id,
                                        )
                                      remove(findIdIndex)
                                    }
                                  }}
                                  type="checkbox"
                                  className="toggle toggle-sm"
                                />
                              </div>
                            )
                          })}
                        {(dataGeneralRoomFacilities?.roomNotHasFacilities?.length >
                          5 &&
                          !showMoreRoomNotHasFacilities) && (
                            <div
                              onClick={() =>
                                setShowMoreRoomNotHasFacilities(true)
                              }
                              className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                            >
                              <CiSquarePlus className="text-base" />
                              Show more facilities
                            </div>
                          )}
                        {showMoreRoomNotHasFacilities &&
                          dataGeneralRoomFacilities?.roomNotHasFacilities
                            ?.slice(
                              5,
                              dataGeneralRoomFacilities?.roomNotHasFacilities
                                .length,
                            )
                            ?.map((item: any, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center rounded-md shadow-md justify-between p-4 border border-slate-200 bg-white"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <figure>
                                      <Image
                                        src={`http://localhost:5000/api/${item?.iconDirectory}/${item?.iconFilename}.${item?.iconFileExtension}`}
                                        width={100}
                                        height={100}
                                        alt=""
                                        className="h-4 w-4"
                                      />
                                    </figure>
                                    <p className="text-sm font-medium text-gray-700">
                                      {item?.name}
                                    </p>
                                  </div>
                                  <input
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        push(item?.id)
                                      } else {
                                        const findIdIndex =
                                          values.propertyRoomFacilitiesId.findIndex(
                                            (itm: number) => itm === item?.id,
                                          )
                                        remove(findIdIndex)
                                      }
                                    }}
                                    type="checkbox"
                                    className="toggle toggle-sm"
                                  />
                                </div>
                              )
                            })}
                        {dataGeneralRoomFacilities?.roomNotHasFacilities
                          ?.length <= 0 && (
                          <div className="flex items-center text-sm gap-1.5 font-medium text-gray-300 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white">
                            <IoSearchOutline className="text-base" />
                            Property facility not found
                          </div>
                        )}
                        {showMoreRoomNotHasFacilities && (
                          <div
                            onClick={() => setShowMoreRoomNotHasFacilities(false)}
                            className="transition duration-100 hover:cursor-pointer hover:underline hover:bg-slate-100 flex items-center text-sm gap-1.5 font-bold text-blue-800 rounded-md shadow-md justify-center p-4 border border-slate-200 bg-white"
                          >
                            <CiSquareMinus className="text-base" />
                            Show less facilities
                          </div>
                        )}
                      </section>
                    </section>
                  </div>
                )}
              </FieldArray>
              <section className="px-5">
                <button
                  type="button"
                  disabled={isPendingUpdateRoomHasFacilities}
                  onClick={() => setIsSubmitting(true)}
                  className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:cursor-not-allowed bg-blue-800 text-sm rounded-full w-full px-5 py-3 flex gap-1.5 items-center justify-center font-bold text-white hover:opacity-75 transition duration-100 active:scale-95"
                >
                  <FiSend className="text-base" />
                  Update
                </button>
              </section>
              <div
                className={`${!isSubmitting && 'hidden'} p-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen shadow-sm bg-black bg-opacity-20 z-[51] flex items-center justify-center`}
              >
                <div className="bg-white border border-slate-200 shadow-md p-5 rounded-md flex flex-col gap-5">
                  <h1 className="text-lg font-bold text-slate-800 pb-2 border-b border-slate-300">
                    Are you sure you want to update your property facilities?
                  </h1>
                  <article className="text-sm font-medium text-gray-500">
                    By confirming, your requested updates will be submitted for
                    review. You can always make changes later.
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
                      disabled={isPendingUpdateRoomHasFacilities}
                      className="disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 px-5 hover:opacity-75 transition duration-100 active:scale-90 py-1.5 text-white text-sm font-bold rounded-full shadow-md border bg-blue-800 border-slate-100"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        }
      </Formik>
    </main>
  )
}

export default PropertyManageRoomAmenitiesPage
