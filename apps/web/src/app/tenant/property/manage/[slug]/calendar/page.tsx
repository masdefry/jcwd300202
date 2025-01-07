'use client'

import { Checkbox } from '@/components/ui/checkbox'
import Separator from '@/features/auth/components/Separator'
import TextInput from '@/features/user/profile/components/TextInput'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineSell } from 'react-icons/md'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaRegCalendar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { addHours } from 'date-fns'

const CalendarPage = ({ params }: { params: { slug: string } }) => {
  const { data: dataSeasonsByProperty, isPending: isPendingSeasonsByProperty } =
    useQuery({
      queryKey: ['getSeasonsByProperty'],
      queryFn: async () => {
        const res = await instance.get(
          `season/${params?.slug}`,
        )
        console.log(res)
        return res?.data?.data
      },
    })
  const [dataRoomPerDate, setDataRoomPerDate] = useState<any>()
  const [activeRoomSetter, setActiveRoomSetter] = useState<any>({
    startDate: '',
    endDate: '',
    name: '',
  })
  const { mutate: mutateGetSeasonalPrice, data: dataGetSeasonalPrice } =
    useMutation({
      mutationFn: async ({
        propertyRoomTypeId,
        date,
      }: {
        propertyRoomTypeId: number
        date: Date
      }) => {
        const res = await instance.get(
          `/season/single/search?propertyRoomTypeId=${propertyRoomTypeId}&date=${date}`,
        )
        return res?.data
      },
      onSuccess: (res) => {
        setDataRoomPerDate(res?.data)
        console.log(res)
      },
      onError: (err: any) => {
        toast((t) => (
          <span className="flex gap-2 items-center text-center font-semibold justify-center text-xs text-red-600">
            {err?.response?.data?.message || 'Connection error!'}
          </span>
        ))
      },
    })

  const { mutate: mutateCreateSeason, isPending: isPendingCreateSeason } =
    useMutation({
      mutationFn: async (values: any) => {
        console.log('MUTATE', values)

        const res = await instance.post('/season', {
          roomPrices: values?.roomPrices,
          roomsToSell: values?.roomsToSell,
          availability: values?.availability,
          propertyRoomTypeId: values?.propertyRoomTypeId,
          name: values?.name,
          startDate: values?.startDate,
          endDate: values?.endDate,
          isPeak: values?.isPeak,
        })

        console.log(res)
        return res?.data
      },
      onSuccess: (res: any) => {
        setActiveRoomSetter({
            startDate: '',
            endDate: '',
            name: '',
        })
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

  const { mutate: mutateUpdateSeason, isPending: isPendingUpdateSeason } =
    useMutation({
      mutationFn: async (values: any) => {
        console.log('MUTATE', values?.seasonId)
        const res = await instance.put('/season', {
          seasonId: values?.seasonId,
          roomPrices: values?.roomPrices,
          roomsToSell: values?.roomsToSell,
          availability: values?.availability,
          propertyRoomTypeId: values?.propertyRoomTypeId,
          name: values?.name,
          startDate: values?.startDate,
          endDate: values?.endDate,
          isPeak: values?.isPeak,
        })

        console.log(res)
        return res?.data
      },
      onSuccess: (res: any) => {
        setActiveRoomSetter({
            startDate: '',
            endDate: '',
            name: '',
        })
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
  //i want to have click and drag to choose multiple dates, what event javascript i must use? btw i use tsx

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  return (
    <main className="flex flex-col gap-10 relative min-h-[1000px] p-5">
      <section className="flex items-center gap-5">
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="sort"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            View:
          </label>
          <select
            name="sort"
            defaultValue="list-view"
            id="sort"
            className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="list-view">List View</option>
            <option value="monthly-view">Monthly View</option>
          </select>
        </span>
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="sort"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            Period:
            {/* periode 1 bulan */}
          </label>
          <select
            name="sort"
            defaultValue="list-view"
            id="sort"
            className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="list-view">List View</option>
            <option value="monthly-view">Monthly View</option>
          </select>
        </span>
      </section>
      {dataSeasonsByProperty?.property?.propertyRoomType?.map(
        (item: any, index: number) => {
          return (
            <section className="flex flex-col gap-5">
              <hgroup className="text-xl font-bold text-gray-900 flex flex-col">
                <h1>{item?.name}</h1>
                <p className="text-sm font-medium text-gray-500">
                  Pan Pacific Jakarta
                </p>
              </hgroup>
              <Separator />
              <div className="overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
                <div className="overflow-hidden flex items-center w-fit bg-white">
                  <div className="flex flex-col border-2 border-white rounded-2xl overflow-hidden bg-slate-600">
                    <div className=" bg-gray-800 text-white justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]">
                      <span className="flex items-center gap-1.5">
                        <FaRegCalendar className="text-gray-50" size={18} />
                        Date
                      </span>
                    </div>
                    <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
                      <span className="flex items-center gap-1.5">
                        <FaCheck className="text-emerald-100" size={18} />
                        Status
                      </span>
                    </div>
                    <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[65px]">
                      <span className="flex items-center gap-1.5">
                        <MdOutlineSell className="text-gray-100" size={18} />
                        Rooms to sell
                      </span>
                      <div className="text-blue-100 hover:opacity-75 hover:cursor-pointer active:underline transition duration-100">
                        Bulk edit
                      </div>
                    </div>
                    <div className="  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]">
                      <span className="flex items-center gap-1.5">
                        <BsCurrencyDollar
                          className="text-green-100"
                          size={18}
                        />
                        Rates
                      </span>
                    </div>
                  </div>
                  {Array.from({
                    length: new Date(year, month, 0).getDate(),
                  }).map((_, index) => {
                      const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex(
                          (season: any) =>
                            (season?.date === addHours(new Date(year, month, index + 1), 7).toISOString()) && (season?.propertyRoomTypeId === item?.id)
                        )
                    // const date = addHours(new Date(year, month, index + 1), 7).toISOString()
                    // const la = dataSeasonsByProperty?.seasons[0]?.date
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          mutateGetSeasonalPrice({
                            propertyRoomTypeId: Number(item?.id),
                            date: new Date(year, month, index + 1),
                          })
                          setActiveRoomSetter({
                            startDate: new Date(year, month, index + 2),
                            endDate: new Date(year, month, index + 2),
                            name: item?.name,
                          })
                        }}
                        className="bg-slate-100 rounded-2xl overflow-hidden flex flex-col border-2 border-white hover:border-amber-400 hover:cursor-pointer active:border-2 active:border-blue-400 transition duration-75"
                      >
                        <div className=" bg-gray-800 text-white justify-center items-end p-2 text-sm font-bold w-[85px] flex flex-col gap-2 h-[45px]">
                          {index + 1}
                        </div>
                        <div className="  justify-center p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[45px]">
                          <div
                            className={`h-[70%] w-full ${seasonIdx <= -1 ? 'bg-green-300 text-green-800' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'}
                                 opacity-65 rounded-full text-xs flex items-center justify-center `}
                          >
                            {seasonIdx <= -1
                              ? 'Open'
                              : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability
                                ? 'Open'
                                : 'Closed'}
                          </div>
                        </div>
                        <div className="  justify-center items-end p-2 text-base font-light text-gray-800 w-[85px] flex flex-col gap-2 h-[65px]">
                          {seasonIdx > -1
                            ? dataSeasonsByProperty?.seasons[seasonIdx]?.roomToRent
                            : item?.totalRooms}
                        </div>
                        <div className="  justify-center items-end p-2 text-sm font-medium text-gray-600 w-full flex flex-col gap-2 h-[45px]">
                          <span className="flex items-center">
                            {seasonIdx > -1
                              ? Math.round(
                                  Number(
                                    dataSeasonsByProperty?.seasons[seasonIdx]?.price,
                                  ) / 1000,
                                )
                              : Math.round(Number(item?.price) / 1000)}
                            <span className="ml-1">K</span>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        },
      )}
      <div
        id="room-setter"
        className={`${activeRoomSetter?.startDate ? 'flex' : 'hidden'} w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51]`}
      >
        <Formik
          initialValues={{
            seasonId: dataRoomPerDate?.season?.id || '',
            roomPrices:
              dataRoomPerDate?.seasonalPrice?.price ||
              dataRoomPerDate?.seasonalPrice?.basePrice ||
              0,
            roomsToSell:
              dataRoomPerDate?.seasonalPrice?.roomToRent ||
              dataRoomPerDate?.seasonalPrice?.totalRooms ||
              0,
            availability:
              dataRoomPerDate?.seasonalPrice?.roomAvailability || true,
            propertyRoomTypeId:
              dataRoomPerDate?.season?.propertyRoomTypeId || '',
            name: dataRoomPerDate?.season?.name || '',
            startDate: dataRoomPerDate?.season?.startDate || new Date(),
            endDate: dataRoomPerDate?.season?.endDate || new Date(),
            isPeak: dataRoomPerDate?.seasonalPrice?.isPeak || false,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log('FORMIK', dataRoomPerDate)
            if (values?.seasonId) {
              mutateUpdateSeason(values)
            } else {
              mutateCreateSeason(values)
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]">
              <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
                <h1>{activeRoomSetter?.name} Type</h1>
                <p className="text-sm font-medium text-gray-500 flex items-center">
                  {activeRoomSetter?.startDate &&
                    activeRoomSetter?.startDate
                      .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('-')}
                </p>
              </hgroup>
              <Separator />
              <section className="flex flex-col gap-3">
                <TextInput
                  name="name"
                  title="Name"
                  type="text"
                  placeholder="Eid al-Fitr"
                />
                <TextInput
                  name="roomPrices"
                  title="Rates"
                  type="number"
                  placeholder="500000"
                />
                <div className="flex items-center gap-1.5">
                  <Checkbox name="availability" checked={values?.availability} onCheckedChange={(e) => {
                    if(e) {
                        setFieldValue('availability', true)
                    } else {
                        setFieldValue('availability', false)
                    }
                    }} className="ml-5" />
                  <label
                    htmlFor="availability"
                    className="text-sm font-bold text-black"
                  >
                    Room available
                  </label>
                </div>
                <div className="flex flex-col gap-1 ">
                  <label
                    htmlFor="pic"
                    className="text-sm font-bold text-black ml-5"
                  >
                    Rooms to sell
                  </label>
                  <Field
                    as="input"
                    disabled={!values?.availability}
                    id="roomsToSell"
                    name="roomsToSell"
                    type="number"
                    placeholder={30}
                    className={`${values?.availability ? 'text-gray-900' : 'text-gray-400'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
                  />
                  <ErrorMessage
                    name="roomsToSell"
                    component={'div'}
                    className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                  />
                </div>
              </section>
              <div className="flex items-center gap-1.5">
                <Checkbox name="isPeak"  checked={values?.isPeak} onCheckedChange={(e) => {
                    if(e) {
                        setFieldValue('isPeak', true)
                    } else {
                        setFieldValue('isPeak', false)
                    }
                    }} className="ml-5" />
                <label
                  htmlFor="isPeak"
                  className="text-sm font-bold text-black"
                >
                  Peak of the season
                </label>
              </div>
              <div className="flex items-center gap-2 justify-end mt-4">
                <button
                  onClick={() =>
                    setActiveRoomSetter({
                      startDate: '',
                      endDate: '',
                      name: '',
                    })
                  }
                  className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md"
                  type="button"
                >
                  Cancel
                </button>
                <button className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default CalendarPage
