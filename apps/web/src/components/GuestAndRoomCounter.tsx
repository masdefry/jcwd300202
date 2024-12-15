'use client'

import Separator from '@/features/auth/components/Separator'
import React from 'react'

interface IGuestAndRoomCounterProps {
    setShowGuestAndRoomCounter: any
}

const GuestAndRoomCounter = ({ setShowGuestAndRoomCounter }: IGuestAndRoomCounterProps) => {
    const className = 'rounded-md h-8 w-8 flex items-center justify-center '

  return (
    <section className='bg-white rounded-3xl w-full 2xl:w-[400px] p-3 shadow-md'>
        <h1 className='text-lg font-bold mb-5'>Total Guest & Room</h1>
        <ul className='flex flex-col text-sm gap-2 justify-between'>
            <li className='flex justify-between items-center'>Adult
                <div className='flex items-center gap-2'>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-</span> 
                    <span className={className}>3</span>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+</span> 
                </div> 
            </li>
            <li className='flex justify-between'>Child (Age under 17) 
                <div className='flex items-center gap-2'>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-</span> 
                    <span className={className}>3</span>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+</span> 
                </div> 
            </li>
            <Separator />
            <li className='flex justify-between font-bold'>Total Guests 
                <span className={className + 'pr-[55px]'}>3</span>
            </li>
            <Separator />
            <li className='flex justify-between font-bold'>Total Rooms 
                <div className='flex items-center gap-2'>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-</span> 
                    <span className={className}>1</span>
                    <span className='transition duration-100 rounded-full h-8 w-8 border border-slate-400 flex font-bold pb-1 hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+</span> 
                </div> 
            </li>
            <Separator />
            <button onClick={() => setShowGuestAndRoomCounter(false)} className='text-center px-5 py-3 font-bold rounded-full bg-black text-white hover:opacity-75 hover:cursor-pointer transition duration-200 active:scale-90'>Close</button>
        </ul>
    </section>
  )
}

export default GuestAndRoomCounter
