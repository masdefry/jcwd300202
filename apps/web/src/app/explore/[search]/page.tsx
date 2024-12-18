'use client'

import React, { useState, useEffect } from 'react' 
import Link from 'next/link'
import searchStore  from '@/zustand/searchStore'
import { headerStore } from '@/zustand/headerStore'
import { differenceInDays } from 'date-fns';

const SearchPage = () => {
  
  const searchResults = searchStore((state: any) => state.searchResults)
  const checkInDate = headerStore((state: any) => state.checkInDate)
  const checkOutDate = headerStore((state: any) => state.checkOutDate)
  const adult = headerStore((state: any) => state.adult)
  const children = headerStore((state: any) => state.children)
  const [totalDays, setTotalDays] = useState(0)

  

  useEffect(() => {
    setTotalDays(differenceInDays(checkOutDate, checkInDate))
  }, [checkOutDate, checkInDate])

  let nights = totalDays === 1? 'night': 'nights'
  console.log(nights, 'nightsss')

  let adults = adult === 1? 'adult' : 'adults'

  


  console.log(searchResults, 'searchResults')
  console.log(checkInDate, checkOutDate, 'testt')
  console.log(totalDays, 'totalDays')
    
  return (
    <main className='w-full min-h-min'>
        <section className='m-auto max-w-screen-2xl w-full h-full flex items-start'>
            <div className='bg-blue-200 w-[27rem] h-full'>

            </div>
            <div className='w-[calc(100% - 27rem)] min-h-min flex flex-col gap-3 p-3'>
                {searchResults.map((item: any, index: any) => {
                    return(
                        <div key={index} className='bg-white !w-[68rem] h-[20rem] border rounded-lg flex items-start gap-3 p-3 shadow'>
                            <div className='bg-blue-200 w-[25rem] h-full rounded'>

                            </div>
                            <div className='w-[45rem] h-full flex flex-col'>
                                <div className='flex flex-col'>
                                    <p className='text-2xl font-bold'>{item.name}</p>
                                </div>
                                <div className='flex flex-col items-end justify-end gap-1 h-full'>
                                    <p className='text-xs'>from <span className='font-bold text-xl pr-1'>{item.propertyRoomType[0].price}</span></p>
                                    <p className='text-sm pr-1'>{totalDays} {nights} | {adult} {adults} {children > 0 && ` | ${children} children`}</p>
                                    <Link href="" className='rounded-full bg-black text-white px-7 py-3 hover:opacity-75 hover:cursor-pointer active:scale-90 transition duration-200 mt-3'>Book this room</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    </main>
  )
}

export default SearchPage
