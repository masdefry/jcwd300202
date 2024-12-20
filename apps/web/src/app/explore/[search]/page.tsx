'use client'

import React, { useState, useEffect } from 'react' 
import Link from 'next/link'
// import searchStore  from '@/zustand/searchStore'
// import { headerStore } from '@/zustand/headerStore'
import { differenceInDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query'
import  useSearchHook from '@/hooks/useSearchHook'
import instance from '@/utils/axiosInstance'
import useSearchParams from 'next/navigation'
import { RiBuilding3Line } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import { CiBookmarkPlus, CiLocationOn } from 'react-icons/ci';

const SearchPage = ({ searchParams }: { searchParams: any }) => {
// const SearchPage = () => {
  
    // const searchParams = useSearchParams()
//   const searchResults = searchStore((state: any) => state.searchResults)
//   const checkInDate = headerStore((state: any) => state.checkInDate)
//   const checkOutDate = headerStore((state: any) => state.checkOutDate)
//   const adult = headerStore((state: any) => state.adult)
//   const children = headerStore((state: any) => state.children)
    const [totalDays, setTotalDays] = useState(0)
    const {
        searchLocation,
        setSearchLocation,
        bookingDays,
        setBookingDays,
        totalGuest,
        setTotalGuest,
        searchResults,
        setSearchResults,
        allGuest,
        setAllGuest
    } = useSearchHook()
    // const { data: dataProperties, isPending, isError, error} = useQuery({
    //     queryKey: ['results'],
    //     queryFn: async() => {
    //         console.log(searchParams, '>>>>>>>>')
    //         const res = await instance.get(
    //             `/search?country=${searchParams.country}&city=${searchParams.city}&checkInDate=${searchParams["check-in-date"]}&checkOutDate=${searchParams["check-out-date"]}&adult=${searchParams.adult}&children=${searchParams.children}`, {
    //         })
    //         console.log("USE QUERY EXPLORE:", res)
    //         setTotalDays(differenceInDays(bookingDays.checkOutDate, bookingDays.checkInDate))
    //         return res
    //     }
    // })


    // if(isError){
    //     console.log(error.message)
    //     return <span>Error: {error.message}</span>
    // }

//   useEffect(() => {
//   }, [bookingDays.checkInDate, bookingDays.checkOutDate])

  let nights = totalDays === 1? 'night': 'nights'
//   console.log(nights, 'nightsss')

  let adults = totalGuest.adult === 1? 'adult' : 'adults'
//   console.log('Explore:', searchResults)
  

//   console.log(searchResults, 'searchResults')
//   console.log(checkInDate, checkOutDate, 'testt')
//   console.log(totalDays, 'totalDays')
    
  return (
    <main className='w-full min-h-min'>
        <section className='m-auto w-full h-full flex items-start'>
            {/* <div className='bg-red-600 w-[27rem] h-full'>

            </div> */}
            <div className='w-full min-h-min flex flex-col gap-3 p-3'>
                {/* {dataProperties?.data?.data?.map((item: any, index: any) => {
                    return(
                        <div key={index} className='bg-white !w-[50rem] h-[17rem] border rounded-lg flex items-start gap-3 p-3 shadow'>
                            <div className='bg-blue-200 w-[25rem] h-full rounded'>

                            </div>
                            <div className='w-[45rem] h-full flex flex-col'>
                                <div className='flex flex-col'>
                                    <p className='text-xl font-bold'>{item.name}</p>
                                </div>
                                <div className='flex flex-col items-end justify-end gap-1 h-full'>
                                    <p className='text-xs'>from <span className='font-bold text-xl pr-1'>{item.propertyRoomType[0].price}</span></p>
                                    <p className='text-sm pr-1'>{totalDays} {nights} | {totalGuest.adult} {adults} {totalGuest.children > 0 && ` | ${totalGuest.children} children`}</p>
                                    <Link href={`/property/${item.name}`} className='rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3'>Book this room</Link>
                                </div>
                            </div>
                        </div>
                    )
                })} */}
                    {
                        Array.from({length: 1}).map((_, index) => {
                            return(
                                <div className='bg-white w-full h-[17rem] rounded-lg flex items-start gap-3 p-3 shadow-md'>
                                    <div className='bg-blue-200 w-[55rem] h-full rounded'>

                                    </div>
                                    <div className='w-[100rem] h-full flex flex-col justify-between'>
                                        <div className='flex justify-between'>
                                            <hgroup className='flex flex-col w-full'>
                                                <h1 className='text-2xl font-bold text-gray-900'>Ritz Carlton Jakarta</h1>
                                                <p className='text-base font-light text-gray-600 flex items-center gap-1'><CiLocationOn size={23} className='text-red-600'/>Jakarta, Indonesia</p>
                                                <div className='flex items-center gap-1 mt-3'>
                                                    <p className='bg-blue-200 rounded-md px-1 py-1 text-blue-700 font-bold text-xs'>Hotel</p>
                                                    <div className='flex items-center'>
                                                        {
                                                            Array.from({length: 5}).map((_, index) => {
                                                                return(
                                                                    <FaStar key={index} size={15} className='text-yellow-400'/>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className='flex flex-wrap items-center gap-1 mt-2'>
                                                    {
                                                        Array.from({length: 3}).map((_, index) => {
                                                            return (
                                                                <p key={index} className='text-gray-800 bg-gray-100 rounded-badge p-1 text-[10.4px] font-semibold'>24 Security</p>
                                                            )
                                                        })
                                                    }
                                                    <p className='text-gray-500 bg-gray-100 rounded-full p-1 text-[10.4px] font-semibold'>2+</p>
                                                </div>
                                            </hgroup>
                                        </div>
                                        <div className='flex justify-end w-full'>
                                            <p className='text-sm pr-1 font-bold text-gray-400'>2 Nights | 2 Adults | 2 children</p>
                                        </div>
                                    </div>
                                    <div className='w-full border-l border-slate-300 flex flex-col h-full items-end justify-between'>
                                        <div className='flex flex-col items-end'>
                                                <span className='flex items-center gap-1 leading-3'>
                                                    <p className='text-base font-bold text-blue-600 flex items-center gap-1'><RiBuilding3Line size={18} className='text-gray-800'/> 9.0</p>
                                                    <p className='text-xs font-medium text-gray-800'>(2000 reviews)</p>
                                                </span>
                                                <p className='text-sm font-light mt-[-4px] text-gray-600'>Awesome</p>
                                        </div>
                                        <div className='flex flex-col items-end justify-end gap-1 h-full w-full'>
                                            <div className='flex flex-col items-end'>
                                                <p className='text-xs text-gray-600'>Starts from <span className='font-bold text-xl pr-1 text-gray-900'>10000000</span></p>
                                                <p className='text-xs text-gray-600 font-bold'>Includes tax & price</p>
                                            </div>
                                            <Link href='' className='rounded-full bg-black text-base font-bold text-white px-6 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center gap-2'><CiBookmarkPlus size={23} />Book this room</Link>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='bg-white w-full h-[17rem] rounded-lg flex items-start gap-3 p-3 shadow-md'>
                                    <div className='bg-blue-200 w-[55rem] h-full rounded'>

                                    </div>
                                    <div className='w-[100rem] h-full flex flex-col justify-between'>
                                        <div className='flex justify-between'>
                                            <hgroup className='flex flex-col w-full'>
                                                <h1 className='text-2xl font-bold text-gray-900'>Pan Pacific Jakarta</h1>
                                                <p className='text-base font-light text-gray-600 flex items-center gap-1'><CiLocationOn size={23} className='text-red-600'/>Jakarta, Indonesia</p>
                                                <div className='flex items-center gap-1 mt-3'>
                                                    <p className='bg-blue-200 rounded-md px-1 py-1 text-blue-700 font-bold text-xs'>Hotel</p>
                                                    <div className='flex items-center'>
                                                        {
                                                            Array.from({length: 5}).map((_, index) => {
                                                                return(
                                                                    <FaStar key={index} size={15} className='text-yellow-400'/>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className='flex flex-wrap items-center gap-1 mt-2'>
                                                    {
                                                        Array.from({length: 3}).map((_, index) => {
                                                            return (
                                                                <p key={index} className='text-gray-800 bg-gray-100 rounded-badge p-1 text-[10.4px] font-semibold'>24 Security</p>
                                                            )
                                                        })
                                                    }
                                                    <p className='text-gray-500 bg-gray-100 rounded-full p-1 text-[10.4px] font-semibold'>2+</p>
                                                </div>
                                            </hgroup>
                                        </div>
                                        <div className='flex justify-end w-full'>
                                            <p className='text-sm pr-1 font-bold text-gray-400'>2 Nights | 4 Adults | 2 children</p>
                                        </div>
                                    </div>
                                    <div className='w-full border-l border-slate-300 flex flex-col h-full items-end justify-between'>
                                        <div className='flex flex-col items-end'>
                                                <span className='flex items-center gap-1 leading-3'>
                                                    <p className='text-base font-bold text-blue-600 flex items-center gap-1'><RiBuilding3Line size={18} className='text-gray-800'/> 9.8</p>
                                                    <p className='text-xs font-medium text-gray-800'>(2000 reviews)</p>
                                                </span>
                                                <p className='text-sm font-light mt-[-4px] text-gray-600'>Awesome</p>
                                        </div>
                                        <div className='flex flex-col items-end justify-end gap-1 h-full w-full'>
                                            <div className='flex flex-col items-end'>
                                                <p className='text-xs text-gray-600'><span className='font-bold text-sm pr-1 text-gray-500 line-through'>23000000</span></p>
                                                <p className='text-xs text-gray-600'>Starts from <span className='font-bold text-xl pr-1 text-gray-900'>18000000</span></p>
                                                <p className='text-xs text-gray-600 font-bold'>Includes tax & price</p>
                                            </div>
                                            <Link href='' className='rounded-full bg-black text-base font-bold text-white px-6 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3 flex items-center gap-2'><CiBookmarkPlus size={23} />Book this room</Link>
                                        </div>

                                    </div>
                    </div>
            </div>
        </section>
    </main>
  )
}

export default SearchPage
