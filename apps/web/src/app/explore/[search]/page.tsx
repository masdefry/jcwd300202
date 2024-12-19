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
    const { data: dataProperties, isPending, isError, error} = useQuery({
        queryKey: ['results'],
        queryFn: async() => {
            console.log(searchParams, '>>>>>>>>')
            const res = await instance.get(
                `/search?country=${searchParams.country}&city=${searchParams.city}&checkInDate=${searchParams["check-in-date"]}&checkOutDate=${searchParams["check-out-date"]}&adult=${searchParams.adult}&children=${searchParams.children}`, {
            })
            console.log("USE QUERY EXPLORE:", res)
            setTotalDays(differenceInDays(bookingDays.checkOutDate, bookingDays.checkInDate))
            return res
        }
    })

    if(isError){
        console.log(error.message)
        return <span>Error: {error.message}</span>
    }

//   useEffect(() => {
//   }, [bookingDays.checkInDate, bookingDays.checkOutDate])

  let nights = totalDays === 1? 'night': 'nights'
  console.log(nights, 'nightsss')

  let adults = totalGuest.adult === 1? 'adult' : 'adults'
  console.log('Explore:', searchResults)
  

//   console.log(searchResults, 'searchResults')
//   console.log(checkInDate, checkOutDate, 'testt')
//   console.log(totalDays, 'totalDays')
    
  return (
    <main className='w-full min-h-min'>
        <section className='m-auto max-w-screen-xl w-full h-full flex items-start'>
            <div className='bg-blue-200 w-[27rem] h-full'>

            </div>
            <div className='w-[calc(100% - 27rem)] min-h-min flex flex-col gap-3 p-3'>
                {dataProperties?.data?.data?.map((item: any, index: any) => {
                    return(
                        <Link href='' key={index} className='bg-white !w-[50rem] h-[17rem] border rounded-lg flex items-start gap-3 p-3 shadow'>
                            <div className='bg-blue-200 w-[25rem] h-full rounded'>

                            </div>
                            <div className='w-[45rem] h-full flex flex-col'>
                                <div className='flex flex-col'>
                                    <p className='text-xl font-bold'>{item.name}</p>
                                </div>
                                <div className='flex flex-col items-end justify-end gap-1 h-full'>
                                    <p className='text-xs'>from <span className='font-bold text-xl pr-1'>{item.propertyRoomType[0].price}</span></p>
                                    <p className='text-sm pr-1'>{totalDays} {nights} | {totalGuest.adult} {adults} {totalGuest.children > 0 && ` | ${totalGuest.children} children`}</p>
                                    <Link href="" className='rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3'>Book this room</Link>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    </main>
  )
}

export default SearchPage
