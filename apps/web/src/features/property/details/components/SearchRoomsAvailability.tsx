'use client'

import React from 'react'
import { GoChecklist } from 'react-icons/go'
import DatePickerWithPrices from '../../components/DatePickerWithPrices'
import { IoPersonOutline, IoSearchOutline } from 'react-icons/io5'
import { RiCloseFill } from 'react-icons/ri'

const SearchRoomsAvailability = ({ searchParams, checkInDate, checkOutDate, handlePropertyRoomType, handleGuest, dateRange, setDateRange, dataPropertyDetail, setShowGuestCounter, showGuestCounter, adult, children, isPending }: any) => {
  if(isPending) {
      return (
      <div className='flex flex-col gap-5 2xl:p-0 px-5'>
              <p className='text-lg md:text-xl 2xl:text-2xl font-bold text-transparent bg-slate-00 skeleton w-fit rounded-none'>Room Availability in New York City</p>
              <div className='flex items-center gap-2 bg-slate-400 skeleton text-sm font-medium md:font-bold p-3 rounded-md text-transparent'>
                  <div className='bg-s flex items-center rounded-full h-9 w-9 p-2'>
                  </div>
                  <p className='md:text-sm text-xs font-bold skeleton rounded-none bg-slate-200'>Choose the room type according to your needs</p>
              </div>
              <div className='relative flex items-center justify-center w-full rounded-md  bg-slate-200 skeleton shadow-md border border-slate-200'>
                  <div className='p-4 overflow-x-auto'>
                      <div className=' flex items-center justify-center bg-slate-200 skeleton rounded-md p-[1px]'>
                          <button className='min-w-max text-xs font-semibold text-gray-800 px-2 py-2 pr-5 flex items-center gap-3 bg-transparent text-transparent'>Adult . Children . 1 Room</button>
                          <button className=' transition duration-100 text-xs font-semibold  px-2 py-2 pr-5 flex items-center gap-3 rounded-r-md bg-transparent text-transparent'>Search</button>
                      </div>
                  </div>
              </div>
          </div>
    )

  }
  
    return (
    <div className='flex flex-col gap-5 2xl:p-0 px-5'>
            <p className='text-lg md:text-xl 2xl:text-2xl font-bold'>Room Availability in {dataPropertyDetail?.property?.name}</p>
            <div className='flex items-center gap-2 bg-gray-900 text-sm font-medium md:font-bold p-3 rounded-md text-white'>
                <div className='bg-green-100 flex items-center rounded-full p-2'>
                    <GoChecklist size={18} className='text-green-600' /> 
                </div>
                <p className='md:text-sm text-xs font-bold'>Choose the room type according to your needs</p>
            </div>
            <div className='relative flex items-center justify-center w-full rounded-md  bg-white shadow-md border border-slate-200'>
                <div className='p-4 overflow-x-auto'>
                    <div className=' flex items-center justify-center bg-amber-400 rounded-md p-[1px]'>
                        <div>
                            <DatePickerWithPrices excludeDateList={dataPropertyDetail?.excludeDate} dateRange={dateRange} setDateRange={setDateRange} checkInDate={checkInDate} checkOutDate={checkOutDate} basePrice={dataPropertyDetail?.basePrice} dateAndPrice={dataPropertyDetail?.dateAndPrice} />
                        </div>
                        <button onClick={() => setShowGuestCounter(true)} className='min-w-max bg-white text-xs font-semibold text-gray-800 px-2 py-2 pr-5 flex items-center gap-3 border-2 border-amber-400 '><IoPersonOutline />{adult} Adult . {children} Children . 1 Room</button>
                        <button onClick={() => {
                            setShowGuestCounter(false)
                            handlePropertyRoomType({ checkInDate, checkOutDate })
                            }} 
                        disabled={!checkInDate && !checkOutDate} className='disabled:bg-slate-300 disabled:text-white disabled:scale-100 disabled:opacity-100 bg-blue-800 hover:opacity-75 transition duration-100 text-xs font-semibold text-white px-2 py-2 pr-5 flex items-center gap-3 rounded-r-md border-2 border-amber-400 '><IoSearchOutline />Search</button>
                    </div>
                </div>
                {
                    showGuestCounter && (
                    <div className='sm:w-fit w-full absolute top-[55px] border-2 border-gray-900 2xl:left-[47%] lg:left-[45%] left-0 sm:left-[43%] z-30 bg-white rounded-md text-sm font-bold flex flex-col gap-4 p-3 shadow-md'>
                        <div className='text-gray-950 text-lg w-full flex justify-end'>
                            <RiCloseFill onClick={() => setShowGuestCounter(false)} className='hover:opacity-60 transition duration-100 hover:cursor-pointer z-10'/>
                        </div>
                        <h1 className='text-base font-gray-800 pb-2 border-b border-slate-300 mt-[-20px]'>Total Guest</h1>
                        <div className='flex items-center gap-5 justify-between'>
                            <p className='text-gray-900'>Adult:</p>
                            <span className='flex items-center gap-1.5'>
                            <span onClick={() => handleGuest('adult', 'minus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                                {adult}
                            <span onClick={() => handleGuest('adult', 'plus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                            </span>
                        </div>
                        <div className='flex items-center gap-5 justify-between'>
                            <p className='text-gray-900'>Children:</p>
                            <span className='flex items-center gap-1.5'>
                            <span onClick={() => handleGuest('children', 'minus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>-</span>
                                {children}
                            <span onClick={() => handleGuest('children', 'plus')} className='flex items-center gap-1.5 rounded-full justify-center bg-slate-700 hover:opacity-60 transition duration-100 hover:cursor-pointer active:scale-90 text-white h-7 w-7'>+</span>
                            </span>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
  )
}

export default SearchRoomsAvailability
