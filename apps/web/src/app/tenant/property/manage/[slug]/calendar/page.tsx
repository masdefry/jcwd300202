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
import { FaFire, FaRegCalendar } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { addDays, addHours, isBefore } from 'date-fns'
import 'rsuite/Calendar/styles/index.css';
import { Calendar } from 'rsuite'
import { differenceInDays } from 'date-fns'

const CalendarPage = ({ params, searchParams }: { params: { slug: string }, searchParams: { view: string} }) => {
  const { data: dataSeasonsByProperty, isPending: isPendingSeasonsByProperty } =
    useQuery({
      queryKey: ['getSeasonsByProperty'],
      queryFn: async () => {
        const res = await instance.get(`season/${params?.slug}`)
        console.log(res)
        return res?.data?.data
      },
    })
    const paramsSearch = new URLSearchParams();
    const [ searchParamsWithValue, setSearchParamsWithValue ] = useState<any>([])
    const handleSearchParams = (orderBy: string ,value: string) => {
      let isOrderByExistIndex = -1
      if(searchParamsWithValue.length > 0) {
        isOrderByExistIndex =  searchParamsWithValue.findIndex((item: any) => item[0] === orderBy)
      }
      if(isOrderByExistIndex <= -1) {
        setSearchParamsWithValue((state: any )=> {
          state.push([orderBy, value])
          return state
        })
      } else {
        setSearchParamsWithValue((state: any )=> {
          state[isOrderByExistIndex] = [orderBy, value]
          return state
        })
      }
      console.log(searchParamsWithValue)
      searchParamsWithValue.forEach((item: any) => {
        paramsSearch.set(item[0], item[1])
      })
      window.history.pushState({}, '', '?' + params.toString())
    }
  const [dateRange, setDateRange] = useState<{ startDate: string | null, endDate: string | null, id?: string | number, name?: string}>({
    startDate: null,
    endDate: null
  })
  const [ roomName, setRoomName ] = useState('')
  const [ roomAvailability, setRoomAvailability ] = useState(true)
  const [ isPeakSeason, setIsPeakSeason ] = useState(false)
  const [ changeDate, setChangeDate ] = useState(true)
  const handleDateRange = (date: Date) => {
    const dateISOString = date.toISOString()
    if(isBefore(addHours(new Date(), 7), date)) {
      if(!dateRange?.startDate || isBefore(date, dateRange.startDate) || ((dateRange?.startDate && dateRange?.endDate) && dateRange?.endDate !== dateISOString)) {
      setDateRange((state) => {
        state.endDate = null
        state.startDate = dateISOString
        return state
      })
      } else if(dateRange?.endDate === dateISOString) {
        setDateRange((state) => {
          state.endDate = null
          state.startDate = null
          return state
        })
      } else if(dateRange?.startDate && !dateRange?.endDate) {
        setDateRange((state) => {
          state.endDate = dateISOString
          return state
        })
      }
    }
  }
  const [dataRoomPerDate, setDataRoomPerDate] = useState<any>()
  const [ratesPercentage, setRatesPercentage] = useState(100)
  const [maxRoomToSell, setMaxRoomToSell] = useState(1)
  const [isEditRateByPercentage, setIsEditRateByPercentage] = useState(true)
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
        setRoomAvailability(res?.data?.seasonalPrice?.roomAvailability)
        setIsPeakSeason(res?.data?.seasonalPrice?.isPeak)
        setRatesPercentage(Math.floor((res?.data?.seasonalPrice?.price/res?.data?.seasonalPrice?.basePrice) * 100))
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
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
          isPeak: values?.isPeak,
        })

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

  const { mutate: mutateCreatePropertySeason, isPending: isPendingCreatePropertySeason } =
    useMutation({
      mutationFn: async (values: any) => {
        const res = await instance.post(`/season/${params?.slug}`, {
          availability: values?.availability,
          roomPricePercentage: values?.roomPricePercentage,
          propertyRoomTypeId: values?.propertyRoomTypeId,
          name: values?.name,
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
          isPeak: values?.isPeak,
        })

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
          startDate: activeRoomSetter?.startDate || dateRange?.startDate,
          endDate: activeRoomSetter?.endDate || dateRange?.endDate,
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

  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState('list-view')
  const [selectRoom, setSelectRoom] = useState('all-rooms')
  const handleRoomName = (value: string) => {
    const findIndex = dataSeasonsByProperty?.property?.propertyRoomType?.findIndex((item: any) => Number(item?.id) === Number(value))
    setRoomName(dataSeasonsByProperty?.property?.propertyRoomType[Number(findIndex)]?.name)
  }
  return (
    <main className="flex flex-col gap-10 relative min-h-screen p-5">
      <div className='flex flex-col'>
        <h1 className='text-lg font-bold text-gray-800'>Season Calendar</h1>
        <p className='text-sm font-medium text-slate-600'>Adjust Your Rates and Availability Anytime, Anywhere—Tailored to the Season.</p>
      </div>
      <section className="flex items-center gap-5">
        <span className="w-fit flex gap-2 items-center">
          <label
            htmlFor="view"
            className="text-xs min-w-max font-bold text-gray-500"
          >
            View:
          </label>
          <select
            onChange={(e) =>{ 
              handleSearchParams('view', e.target.value)
              setViewMode(e.target.value)
            }}
            name="view"
            defaultValue={searchParams.view || "list-view"}
            id="view"
            className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="list-view">List View</option>
            <option value="monthly-view">Monthly View</option>
          </select>
        </span>
        {
          viewMode === 'monthly-view' && (
          <span className="w-fit flex gap-2 items-center">
            <label
              htmlFor="select-room"
              className="text-xs min-w-max font-bold text-gray-500"
            >
              Select room:
            </label>
            <select
              name="select-room"
              onChange={(e) => {
                setSelectRoom(state => {
                  state = e.target.value
                  return state
                })
                handleRoomName(e.target.value)
              }}
              defaultValue="all-rooms"
              id="select-room"
              className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 w-[250px] min-w-max focus:outline-none focus:ring-slate-400 focus:border-slate-400 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="all-rooms">All Rooms</option>
              {
                dataSeasonsByProperty?.property?.propertyRoomType.map((item: any, index:number) => {
                  return (
                    <option key={index} value={item?.id}>{item?.name}</option>
                  )
                })
              }
            </select>
          </span>
          )
        }
        {
          viewMode === 'list-view' && (
          <span className="w-fit flex gap-2 items-center">
            <label
              htmlFor="period"
              className="text-xs min-w-max font-bold text-gray-500"
            >
              Period:
            </label>
            <select
              name="period"
              onChange={(e) => {
                  setMonth(Number(e.target.value.split('-')[0]))
                  setYear(Number(e.target.value.split('-')[1]))
              }}
              defaultValue={`${month}-${year}`}
              id="period"
              className="hover:cursor-pointer bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-[200px] min-w-max dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            > 
              {
                  Array.from({length: 12}).map((_, index) => {
                      return (
                          <option value={`${index}-${year}`}>{index+1 < 10 ? '0' + (index + 1) : index + 1} - {year}</option>
                      )
                  })
                  
              }
            </select>
          </span>
          )
        }
      </section>
      {viewMode === 'list-view' && dataSeasonsByProperty?.property?.propertyRoomType?.map(
        (item: any, index: number) => {
          return (
            <section className="flex flex-col gap-5">
              <hgroup className="text-xl font-bold text-gray-900 flex flex-col">
                <h1>{item?.name}</h1>
                <p className="text-sm font-medium text-gray-500">
                  {dataSeasonsByProperty?.property?.name}
                </p>
              </hgroup>
              <Separator />
              <div className="overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
                <div className="overflow-hidden flex items-center w-fit bg-white">
                  <div className="flex flex-col border-2 border-white rounded-2xl overflow-hidden bg-slate-600">
                    <div className=" bg-gray-800 text-white justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]">
                      <span className="flex items-center gap-1.5">
                        <FaRegCalendar className="text-gray-50" size={18} />
                        Month {(month+1) < 10 ? '0' + (month+1) : month + 1}-{year}
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
                        (Ready to rent)
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
                  }).map((_: any, index: number) => {
                      const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex(
                          (season: any) =>
                            (season?.date === addHours(new Date(year, month, index + 1), 7).toISOString()) && (season?.propertyRoomTypeId === item?.id)
                        )
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if(isBefore(new Date(), new Date(year, month, index + 1))) {
                            mutateGetSeasonalPrice({
                              propertyRoomTypeId: Number(item?.id),
                              date: new Date(year, month, index + 1),
                            })
                            setActiveRoomSetter({
                              startDate: new Date(year, month, index + 2),
                              endDate: new Date(year, month, index + 2),
                              name: item?.name,
                            })
                          }
                        }}
                        className={`${seasonIdx <= -1 ? 'bg-slate-100' : dataSeasonsByProperty?.seasons[seasonIdx]?.roomAvailability ? 'bg-slate-100' : 'bg-red-200'} rounded-2xl overflow-hidden flex flex-col border-2 border-white hover:border-amber-400 ${isBefore(new Date(year, month, index + 1), new Date()) ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'} active:border-2 active:border-blue-400 transition duration-75`}
                      >
                        <div className=" bg-gray-800 text-white flex items-center justify-between p-2 text-sm font-bold w-[85px]  gap-2 h-[45px]">
                            <div>
                        {seasonIdx <= -1
                            ? "" : dataSeasonsByProperty?.seasons[seasonIdx]?.isPeak ? (
                              <FaFire className='text-amber-400 text-lg' />
                            ) : ''}

                            </div>
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
                              ? (
                                Number(dataSeasonsByProperty?.seasons[seasonIdx]?.price) > 100000 ? 
                                Number(dataSeasonsByProperty?.seasons[seasonIdx]?.price / 1000000).toFixed(1).toString()+'M' : 
                                Number(dataSeasonsByProperty?.seasons[seasonIdx]?.price).toString().slice(0, -3)+'K'
                                )
                              : ( 
                                Number(item?.price) > 100000 ? 
                                Number(item?.price / 1000000).toFixed(1).toString()+'M' : 
                                Number(item?.price).toString().slice(0, -3)+'K'
                                )}
                            
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
      {
        viewMode === 'monthly-view' && (
        <div className='w-full flex flex-col gap-5'>
          <hgroup className="text-xl font-bold text-gray-900 flex items-center gap-1">
            <h1 className=' flex items-center gap-1'>{selectRoom === 'all-rooms' ? dataSeasonsByProperty?.property?.name + ' Property' : roomName + ' Room Type'}</h1>
          </hgroup>
          <div className='w-full flex items-center'>
          <Calendar
          onSelect={(date) => { 
            let seasonStartDate: any;
            let seasonEndDate: any;
            let seasonId: any;
            let seasonName: any
            dataSeasonsByProperty?.propertySeasons?.forEach((seasonalPrice: any, index: number) => {
              const getIndex = seasonalPrice?.seasonalPrice?.findIndex((season: any) => (season?.date === addHours(date, 7).toISOString()) && (season?.propertyId === dataSeasonsByProperty?.property?.id))
              if(getIndex > -1) {
                seasonStartDate = seasonalPrice?.startDate
                seasonEndDate = seasonalPrice?.endDate
                seasonId = seasonalPrice?.id
                seasonName = seasonalPrice?.name
              }
            })
            if(seasonId) {
              setDateRange({
                startDate: seasonStartDate,
                endDate: seasonEndDate,
                id: seasonId,
                name: seasonName 
              })
            } else {
              handleDateRange(addHours(date, 7))
            }
            setChangeDate((state) => !state)
          }}
          cellClassName={(date) => {
            let rangeDateArr: any[] = []
            if(dateRange?.endDate && dateRange?.startDate) {
              rangeDateArr = Array.from({length: differenceInDays(dateRange?.endDate, dateRange?.startDate) + 1}).map((_, index) => {
                return addDays(dateRange?.startDate as string, index).toISOString()
              })
            }

            if(isBefore(date, new Date())) {
              return 'bg-gray-200 active:outline-none active:border-none active:ring-0 hover:cursor-not-allowed hover:bg-gray-200 active:cursor-not-allowed text-gray-500'
            } else if(rangeDateArr.length > 0 && rangeDateArr.includes(new Date(addHours(date, 7)).toISOString())) {
              return 'bg-blue-300 text-gray-900'
            }
            return ''
          }}
          renderCell={(date) => {
            const seasonIdxHighestPrice = dataSeasonsByProperty?.seasons?.findIndex((season: any) => (season?.date === addHours(date, 7).toISOString()) && (season?.propertyRoomTypeId === dataSeasonsByProperty?.property?.propertyRoomType[dataSeasonsByProperty?.property?.propertyRoomType.length - 1]?.id) )
            const seasonIdxLowestPrice = dataSeasonsByProperty?.seasons?.findIndex((season: any) => (season?.date === addHours(date, 7).toISOString()) && (season?.propertyRoomTypeId === dataSeasonsByProperty?.property?.propertyRoomType[0]?.id) )
            let seasonalPriceIdxPropertySeason;
            let seasonIdxPropertySeason = -1;
            let isStartSeason;
            let isEndSeason;
            let isAvailable;
            let seasonStartDate: any;
            let seasonEndDate: any;
            let seasonId: any;
            dataSeasonsByProperty?.propertySeasons?.forEach((seasonalPrice: any, index: number) => {
              const getIndex = seasonalPrice?.seasonalPrice?.findIndex((season: any) => (season?.date === addHours(date, 7).toISOString()) && (season?.propertyId === dataSeasonsByProperty?.property?.id))
              if(getIndex > -1) {
                seasonalPriceIdxPropertySeason = getIndex
                seasonIdxPropertySeason = index
                isEndSeason = seasonalPrice?.seasonalPrice[getIndex]?.isEndSeason
                isStartSeason = seasonalPrice?.seasonalPrice[getIndex]?.isStartSeason
                isAvailable = seasonalPrice?.seasonalPrice[getIndex]?.roomAvailability
                seasonStartDate = seasonalPrice?.startDate
                seasonEndDate = seasonalPrice?.endDate
                seasonId = seasonalPrice?.id
              }
            })

            let highestPrice = dataSeasonsByProperty?.property?.propertyRoomType[dataSeasonsByProperty?.property?.propertyRoomType.length - 1]?.price
            let lowestPrice = dataSeasonsByProperty?.property?.propertyRoomType[0]?.price
            let isPropertyHasSeason = false
            let isRoomHasSeason = false
            if( seasonIdxHighestPrice > -1) {
              highestPrice = dataSeasonsByProperty?.seasons[seasonIdxHighestPrice]?.price
            }
            if( seasonIdxLowestPrice > -1) {
              lowestPrice = dataSeasonsByProperty?.seasons[seasonIdxLowestPrice]?.price
            }
            let roomPrice = 0
            if(selectRoom !== 'all-rooms') {
              const findRoomIdx = dataSeasonsByProperty?.property?.propertyRoomType.findIndex((room: any) => Number(room?.id) === Number(selectRoom))
              roomPrice = dataSeasonsByProperty?.property?.propertyRoomType[findRoomIdx]?.price
              const seasonIdx = dataSeasonsByProperty?.seasons?.findIndex((season: any) => (season?.date === addHours(date, 7).toISOString()) && (Number(season?.propertyRoomTypeId) === Number(selectRoom)) )
              if( seasonIdx > -1) {
                roomPrice = dataSeasonsByProperty?.seasons[seasonIdx]?.price
                isStartSeason = dataSeasonsByProperty?.seasons[seasonIdx]?.isStartSeason
                isEndSeason = dataSeasonsByProperty?.seasons[seasonIdx]?.isEndSeason
              }
            } 
            const seasonName = dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]?.name
            return (
            
            <div className='w-full h-fit flex flex-col items-center justify-center text-xs font-medium text-gray-500'>
                    {
                      (isStartSeason && isEndSeason && seasonName) && (
                      <div className='mt-[2px] px-5 w-full'>
                        <div className={`py-[2px] px-1 relative w-full rounded-full text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}>
                        {dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]?.name}
                        </div>
                      </div>
                      )
                    }
                    {
                      (isStartSeason && !isEndSeason && seasonName) && (
                      <div className={`mt-[2px] py-[2px] px-6 relative left-[30px]  text-left rounded-l-full w-[calc(100%+10px)] text-[10px] text-white font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}>
                        {dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]?.name}
                      </div>
                      )
                    }
                    {
                      (!isStartSeason && isEndSeason && seasonName) && (
                      <div className={`mt-[2px] text-transparent py-[2px] px-1 relative right-[30px] rounded-r-full w-[calc(100%+10px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}>
                        {dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]?.name}
                      </div>
                      )
                    }
                    {
                      (!isStartSeason && !isEndSeason && seasonName) && (
                      <div className={`mt-[2px] text-transparent py-[2px] px-1 relative w-[calc(100%+20px)] text-[10px] font-bold ${isAvailable ? 'bg-emerald-700' : 'bg-red-700'}`}>
                        {dataSeasonsByProperty?.propertySeasons[seasonIdxPropertySeason]?.name}
                      </div>
                      )
                    }
                  
              {
                selectRoom === 'all-rooms' ? (
                <div className='w-full h-fit flex items-center justify-center p-1.5'>
                  <p>{Number(lowestPrice) > 100000 ? Number(lowestPrice / 1000000).toFixed(1).toString()+'M' : Number(lowestPrice).toString().slice(0, -3)+'K'}</p>
                  <p>-</p>
                  <p>{Number(highestPrice) > 100000 ? Number(highestPrice / 1000000).toFixed(1).toString()+'M' : Number(highestPrice).toString().slice(0, -3)+'K'}</p>
                </div>
                ) : (
                  <p>{Number(roomPrice) > 100000 ? Number(roomPrice / 1000000).toFixed(1).toString()+'M' : Number(roomPrice).toString().slice(0, -3)+'K'}</p>
                )
              }
            </div>
          )}}
          />

          </div>
        </div>
        )
      }
        <Formik
          initialValues={{
            seasonId: dataRoomPerDate?.season?.id || '',
            roomPrices:
              dataRoomPerDate?.seasonalPrice?.price ||
              dataRoomPerDate?.seasonalPrice?.basePrice ||
              0,
            roomPricePercentage: dataRoomPerDate?.seasonalPrice?.price ? 
            Math.floor((dataRoomPerDate?.seasonalPrice?.price/dataRoomPerDate?.seasonalPrice?.basePrice) * 100) : 100,
            roomsToSell:
            (dataRoomPerDate?.seasonalPrice?.roomToRent || (dataRoomPerDate?.seasonalPrice?.roomToRent !== 0)) ? 
            dataRoomPerDate?.seasonalPrice?.roomToRent : dataRoomPerDate?.seasonalPrice?.totalRooms ?
            dataRoomPerDate?.seasonalPrice?.totalRooms : 0,
            availability:
              dataRoomPerDate?.seasonalPrice?.roomAvailability || true,
            propertyRoomTypeId:
              dataRoomPerDate?.season?.propertyRoomTypeId || '',
            name: dataRoomPerDate?.season?.name || dateRange?.name || '',
            startDate: dataRoomPerDate?.season?.startDate || new Date(),
            endDate: dataRoomPerDate?.season?.endDate || new Date(),
            isPeak: dataRoomPerDate?.seasonalPrice?.isPeak || false,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            setRoomAvailability(true)
            setIsPeakSeason(false)
            if(!(selectRoom == 'all-rooms' && viewMode === 'monthly-view')) {
              if (values?.seasonId) {
                mutateUpdateSeason(values)
              } else {
                mutateCreateSeason(values)
              }
            } else  {
              mutateCreatePropertySeason(values)
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
            <section className={`${(activeRoomSetter?.startDate || (dateRange?.startDate && dateRange?.endDate)) ? 'flex' : 'hidden'} w-full backdrop-blur-sm bg-black bg-opacity-25 h-full top-0 left-0 fixed items-center justify-center z-[51]`}>
                <div className="shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]">
                {
                 viewMode === 'list-view' && (
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
                 )
                }
                {
                 viewMode === 'monthly-view' && (
                  <hgroup className="text-base font-bold text-gray-900 flex flex-col items-center">
                      <h1>{roomName ? roomName + ' Type' : 'All Room Types'}</h1>
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                      {dateRange?.startDate &&
                          dateRange?.startDate
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('-')} 
                         {(dateRange?.endDate && dateRange?.endDate !== dateRange?.startDate) &&
                          ' until ' + dateRange?.endDate
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('-')}  
                      </p>
                  </hgroup>
                 )
                }
              
                <Separator />
                <section className="flex flex-col gap-3">
                    <TextInput
                    name="name"
                    title="Name"
                    type="text"
                    placeholder="Eid al-Fitr"
                    />
                    <div className="flex items-center gap-1.5">
                    <Checkbox name="isEditRateByPercentage" checked={isEditRateByPercentage} onCheckedChange={(e) => {
                        if(e) {
                            setIsEditRateByPercentage(true)
                            setChangeDate(state => !state)
                          } else {
                            setIsEditRateByPercentage(false)
                            setChangeDate(state => !state)
                        }
                        }

                        } className="ml-5" />
                    <label
                        htmlFor="isEditRateByPercentage"
                        className="text-sm font-bold text-black"
                    >
                        Edit Rates By Percentage
                    </label>
                    </div>
                    {
                      dataRoomPerDate?.seasonalPrice?.basePrice && (
                        <div className='flex items-center gap-2 w-full'>
                        <div className='w-full text-xs text-gray-600 bg-slate-300 rounded-full px-2 flex justify-center py-1 font-bold'>
                          Default: Rp{ dataRoomPerDate?.seasonalPrice?.basePrice}
                        </div>
                        {
                          isEditRateByPercentage && (
                        <div className='w-full text-xs text-gray-600 bg-slate-300 rounded-full px-2 flex justify-center py-1 font-bold'>
                          New: Rp{values?.roomPrices}
                        </div>
                          )
                        }
                        </div>
                      )
                    }
                    {
                      ((!isEditRateByPercentage ) || (viewMode === 'monthly-view' && selectRoom === 'all-rooms')) ? (
                        <TextInput
                        name="roomPrices"
                        title="Rates"
                        type="number"
                        placeholder="500000"
                        />
                      ) : (
                        <div className='flex flex-col gap-1 '>
                            <label htmlFor="pic" className='text-sm font-bold text-black ml-5'>Rates Percentage (%)</label>
                            <input value={ratesPercentage} onChange={(e) => {
                              setFieldValue('roomPrices',  Math.floor(dataRoomPerDate?.seasonalPrice?.basePrice * (Number(e.target.value)/100)))
                              setRatesPercentage(Number(e.target.value))
                              setChangeDate(state => !state)
                              }} id='roomPricePercentage' name='roomPricePercentage' type='number' placeholder='100' className='placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium text-gray-900 focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2' />
                            <ErrorMessage name='roomPricePercentage' component={'div'} className='text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20'/>
                        </div>

                      )
                    }
                    <div className="flex items-center gap-1.5">
                    <Checkbox name="availability" checked={roomAvailability} onCheckedChange={(e) => {
                        if(e) {
                            setRoomAvailability(true)
                            setFieldValue('availability', true)
                          } else {
                            setRoomAvailability(false)
                            setFieldValue('availability', false)
                        }
                        }

                        } className="ml-5" />
                    <label
                        htmlFor="availability"
                        className="text-sm font-bold text-black"
                    >
                        Room available
                    </label>
                    </div>
                    {
                      (selectRoom !== 'all-rooms' || viewMode === 'list-view')  && (
                      <div className="flex flex-col gap-1 ">
                      <label
                          htmlFor="pic"
                          className="text-sm font-bold text-black ml-5"
                      >
                          Rooms to sell
                      </label>
                      <Field
                          as="input"
                          disabled={!values?.availability || !roomAvailability}
                          id="roomsToSell"
                          name="roomsToSell"
                          max={dataRoomPerDate?.seasonalPrice?.totalRooms}
                          type="number"
                          placeholder={30}
                          className={`${(!values?.availability || !roomAvailability) ? 'text-gray-400' : 'text-gray-900'} placeholder-shown:text-sm placeholder-shown:text-slate-300 focus:outline-none text-sm font-medium  focus:ring-slate-600 border border-slate-300 rounded-full px-5 py-2`}
                      />
                      <ErrorMessage
                          name="roomsToSell"
                          component={'div'}
                          className="text-red-600 px-4 text-xs font-bold mt-[-10px] ml-5 bg-red-200 p-1 rounded-full z-20"
                      />
                      </div>

                      )
                    }
                </section>
                <div className="flex items-center gap-1.5">
                    <Checkbox name="isPeak"  checked={isPeakSeason} onCheckedChange={(e) => {
                        if(e) {
                            setIsPeakSeason(true)
                            setFieldValue('isPeak', true)
                          } else {
                            setIsPeakSeason(false)
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
                    onClick={() => {
                        setActiveRoomSetter({
                        startDate: '',
                        endDate: '',
                        name: '',
                        })
                        setDateRange({
                          startDate: null,
                          endDate: null,  
                        })
                    }}
                    className="text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md"
                    type="button"
                    >
                    Cancel
                    </button>
                    <button disabled={!values?.name} className="disabled:text-white disabled:bg-slate-300 disabled:scale-100 disabled:cursor-not-allowed text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md">
                    Save
                    </button>
                </div>
                </div>
            </section>

            </Form>
          )}
        </Formik>

    </main>
  )
}

export default CalendarPage
