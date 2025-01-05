'use client'

import { Checkbox } from '@/components/ui/checkbox'
import Separator from '@/features/auth/components/Separator'
import TextInput from '@/features/user/profile/components/TextInput'
import instance from '@/utils/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdOutlineSell } from 'react-icons/md'
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegCalendar } from 'react-icons/fa6'
import toast from 'react-hot-toast'

const CalendarPage = ({ params }: { params: { slug: string } }) => {
    const { data: dataPropertyRoomType, isPending: isPendingPropertyRoomType } = useQuery({
        queryKey: ['getPropertyRoomType'],
        queryFn: async() => {
            const res = await instance.get(`room-type/property/${params?.slug}/search?limit=3&offset=0`)
            console.log(res)
            return res?.data?.data
        }
    })

    const { mutate: mutateGetSeasonalPrice, data: dataGetSeasonalPrice } = useMutation({
        mutationFn: async({ propertyRoomTypeId, date }: { propertyRoomTypeId: number, date: Date }) => {
            console.log('1:', propertyRoomTypeId)
            console.log('2:', date)
            const res = await instance.get(`/season/single/search?propertyRoomTypeId=${propertyRoomTypeId}&date=${date}`)
            console.log(res)
            return res?.data
        },
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (err: any) => {
            toast((t) => (
        <span className='flex gap-2 items-center font-semibold justify-center text-xs text-red-600'>
          {err?.response?.data?.message || 'Connection error!'}
        </span>
      ))
        }
    })
    //i want to have click and drag to choose multiple dates, what event javascript i must use? btw i use tsx
  const [activeRoomSetter, setActiveRoomSetter] = useState(false)  
  const [ month, setMonth ] = useState(new Date().getMonth())
  const [ year, setYear ] = useState(new Date().getFullYear())
  return (
    <main className='flex flex-col gap-10 relative min-h-[1000px] p-5'>
        <section className='flex items-center gap-5'>
        <span className='w-fit flex gap-2 items-center'>
            <label htmlFor="sort" className='text-xs min-w-max font-bold text-gray-500'>View:</label>
            <select name='sort' defaultValue='list-view' id="sort" className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="list-view">List View</option>
                <option value="monthly-view">Monthly View</option>
            </select>
        </span>
        <span className='w-fit flex gap-2 items-center'>
            <label htmlFor="sort" className='text-xs min-w-max font-bold text-gray-500'>Period:</label>
            <select name='sort' defaultValue='list-view' id="sort" className="bg-gray-50 border border-slate-300 text-gray-800 text-xs font-semibold rounded-full h-[3em] p-1.5 px-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="list-view">List View</option>
                <option value="monthly-view">Monthly View</option>
            </select>
        </span>
        </section>
        {
            dataPropertyRoomType?.propertyRoomType?.map((item: any, index: number) => {
                return (
                <section className='flex flex-col gap-5'>
                    <hgroup className='text-xl font-bold text-gray-900 flex flex-col'>
                        <h1>{item?.name}</h1>
                        <p className='text-sm font-medium text-gray-500'>Pan Pacific Jakarta</p>
                    </hgroup>
                    <Separator />
                    <div className='overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300'>
                        <div className='overflow-hidden flex items-center w-fit bg-white'>
                            <div className='flex flex-col border-2 border-white rounded-2xl overflow-hidden bg-slate-600'>
                                <div className=' bg-gray-800 text-white justify-center p-2 text-sm font-bold w-[200px] flex flex-col gap-2 h-[45px]'>
                                <span className='flex items-center gap-1.5'><FaRegCalendar className='text-gray-50' size={18}/>Date</span>
                                </div>
                                <div className='  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]'>
                                <span className='flex items-center gap-1.5'><FaCheck className='text-emerald-100' size={18}/>Status</span>
                                </div>
                                <div className='  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[65px]'>
                                <span className='flex items-center gap-1.5'><MdOutlineSell className='text-gray-100' size={18}/>Rooms to sell</span>
                                    <div className='text-blue-100 hover:opacity-75 hover:cursor-pointer active:underline transition duration-100'>
                                        Bulk edit
                                    </div>
                                </div>
                                <div className='  justify-center p-2 text-sm font-bold text-white w-[200px] flex flex-col gap-2 h-[45px]'>
                                <span className='flex items-center gap-1.5'><BsCurrencyDollar className='text-green-100' size={18}/>Rates</span>
                                </div>
                            </div>
                            {
                                Array.from({length: new Date(year, month, 0).getDate()}).map((_, index) => {
                                    const seasonIdx = item?.seasonalPrice?.findIndex((season: any) => season.date === new Date(year, month, index + 1))
                                    return (
                                    <div key={index} onDoubleClick={() => {
                                        mutateGetSeasonalPrice({ propertyRoomTypeId: Number(item?.id), date: new Date(year, month, index + 1) })
                                        setActiveRoomSetter(true)
                                        }} 
                                        className='bg-slate-100 rounded-2xl overflow-hidden flex flex-col border-2 border-white hover:border-amber-400 hover:cursor-pointer active:border-2 active:border-blue-400 transition duration-75'>
                                        <div className=' bg-gray-800 text-white justify-center items-end p-2 text-sm font-bold w-[85px] flex flex-col gap-2 h-[45px]'>
                                        {index + 1}
                                        </div>
                                        <div className='  justify-center p-2 text-sm font-bold text-gray-800 w-[85px] flex flex-col gap-2 h-[45px]'>
                                            <div className={`h-[70%] w-full ${seasonIdx <= -1 ? 'bg-green-300 text-green-800' : item?.seasonalPrice[seasonIdx]?.roomAvailability ? 'bg-red-300 text-red-800' : 'bg-green-300 text-green-800' } opacity-65 rounded-full text-xs flex items-center justify-center `}>
                                            {seasonIdx <= -1 ? 'Open' : item?.seasonalPrice[seasonIdx]?.roomAvailability ? 'Closed' : 'Open'}
                                            </div>
                                        </div>
                                        <div className='  justify-center items-end p-2 text-base font-light text-gray-800 w-[85px] flex flex-col gap-2 h-[65px]'>
                                            {
                                                (seasonIdx <= -1) ? (
                                                    item?.seasonalPrice[seasonIdx]?.roomToRent
                                                ) : (item?.totalRooms)
                                            }
                                        </div>
                                        <div className='  justify-center items-end p-2 text-sm font-medium text-gray-600 w-[85px] flex flex-col gap-2 h-[45px]'>
                                            <span className='flex items-center'>
                                                {
                                                    seasonIdx <= -1? (
                                                        Math.round(Number(item?.seasonalPrice[seasonIdx]?.price) / 1000)
                                                    ) : (
                                                        Math.round(Number(item?.price) / 1000)
                                                    )
                                                }
                                                <span className='ml-1'>K</span>
                                            </span>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                )
            })
        }
        <div id='room-setter' className={`${activeRoomSetter ? 'flex' : 'hidden'} w-full backdrop-blur-[1px] h-full top-0 left-0 absolute items-center justify-center z-[51]`}>
            <Formik
                initialValues={{
                    roomPrices: dataGetSeasonalPrice?.data?.seasonalPrice?.price || 0,
                    roomsToSell: dataGetSeasonalPrice?.data?.seasonalPrice?.roomToRent || 0,
                    availability: dataGetSeasonalPrice?.data?.seasonalPrice?.roomAvailability || true,
                    propertyRoomTypeId: dataGetSeasonalPrice?.data?.season?.name || '',
                    name: dataGetSeasonalPrice?.data?.season?.name || '',
                    startDate: dataGetSeasonalPrice?.data?.season?.startDate || new Date(),
                    endDate: dataGetSeasonalPrice?.data?.season?.endDate || new Date(), 
                    isPeak: dataGetSeasonalPrice?.data?.seasonalPrice?.isPeak || false
                }}

                enableReinitialize={true}
                onSubmit={(values) => {
                    setActiveRoomSetter(false)
                }}
            >
                <Form className='shadow-md rounded-2xl bg-white p-5 flex flex-col gap-5 w-[400px]'>
                    <hgroup className='text-base font-bold text-gray-900 flex flex-col items-center'>
                        <h1>Suite Cityview</h1>
                        <p className='text-sm font-light text-gray-500'>Pan Pacific Jakarta</p>
                    </hgroup>
                    <Separator />
                    <section className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="availability" className='text-sm font-bold text-black ml-5'>Room availability</label>
                            <div className='flex items-center gap-5 ml-5'>
                                <div className='flex items-center gap-1.5'>
                                    <input type="radio" name="availability" id="close" className='hover:cursor-pointer scale-90 mt-[2px]'/>
                                    <label htmlFor="close" className='text-sm font-light text-gray-800'>Close</label>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <input type="radio" name="availability" id="open" className='hover:cursor-pointer scale-90 mt-[2px]' defaultChecked={true}/>
                                    <label htmlFor="open" className='text-sm font-light text-gray-800'>Open</label>
                                </div>
                            </div>
                        </div>
                        <TextInput 
                        name='name'
                        title='Name'
                        type='text'
                        placeholder='Eid al-Fitr'
                        />    
                        <TextInput 
                        name='roomPrices'
                        title='Rates'
                        type='number'
                        placeholder='500000'
                        />    
                        <TextInput 
                        name='roomsToSell'
                        title='Rooms to sell'
                        type='number'
                        placeholder='30'
                        />
                    </section>
                    <div className='flex items-center gap-1.5'>
                      <Checkbox name='isPeak' className='ml-5'/>
                      <label htmlFor="availability" className='text-sm font-bold text-black'>Peak of the season</label>
                    </div>
                    <div className='flex items-center gap-2 justify-end mt-4'>
                        <button onClick={() => setActiveRoomSetter(false)} 
                        className='text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-white text-gray-800 shadow-md' type='button'>Cancel</button>
                        <button className='text-xs font-bold rounded-full px-5 py-3 w-full hover:opacity-75 transition duration-100 active:scale-90 bg-gray-800 text-white shadow-md' type='submit'>Save</button>
                    </div>    
                </Form>
            </Formik>
        </div>
    </main>
  )
}

export default CalendarPage
