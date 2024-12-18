'use client'

import Separator from '@/features/auth/components/Separator'
import React, { useEffect } from 'react'
import { headerStore } from '@/zustand/headerStore'

interface IGuestAndRoomCounterProps {
    setShowGuestAndRoomCounter: any
}

const GuestAndRoomCounter = ({ setShowGuestAndRoomCounter }: IGuestAndRoomCounterProps) => {
    const className = 'rounded-md h-8 w-8 flex items-center justify-center '
    const adult = headerStore((state: any) => state.adult)
    const setAdult = headerStore((state: any) => state.setAdult)

    const children = headerStore((state: any) => state.children)
    const setChildren = headerStore((state: any) => state.setChildren)

    const totalRooms = headerStore((state: any) => state.totalRooms)
    const setTotalRooms = headerStore((state: any) => state.setTotalRooms)

    const totalGuest = headerStore((state: any) => state.totalGuest)
    const setTotalGuest = headerStore((state: any) => state.setTotalGuest)
    const roomCapacityReq = headerStore((state: any) => state.roomCapacityReq)

    const updateTotalGuest = () => {
        if(totalGuest <= 10) {
            setAdult({ adult: Math.min(adult, 10) })
            setChildren({ children: Math.min(children, 10) })
        }
        headerStore.setState({totalGuest: Math.min(adult + children, 10)})
    };

    useEffect(() => {
        updateTotalGuest()
    }, [adult, children])

  return (
    <section className='bg-white rounded-lg w-full 2xl:w-[300px] p-3 shadow-md'>
        <h1 className='text-sm font-bold mb-5'>Total Guest & Room</h1>
        <ul className='flex flex-col gap-3'>
            <li className='flex items-center justify-between'>
                <p className='text-sm'>Adult</p>
                <div className='flex items-center justify-center gap-4'>
                    <button onClick={() => adult > 1  && setAdult({adult: adult - 1})} className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-</button> 
                    <p className='text-sm'>{adult}</p>
                    <button onClick={() => setAdult({adult: adult + 1})} disabled={adult + children >= 10}  className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+</button> 
                </div> 
            </li>
            <li className='flex items-center justify-between'>
                <p className='text-sm'>Children <span className='text-xs'>(age under 16)</span></p>
                <div className='flex items-center justify-center gap-4'>
                    <button onClick={() => children > 0 && setChildren({children: children - 1})} className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-</button> 
                    <p className='text-sm'>{children}</p>
                    <button onClick={() => setChildren({children: children + 1})}  disabled={adult + children >= 10}  className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+</button> 
                </div>   
            </li>
            <hr />
            <div className='w-full flex items-center justify-between mt-4'>
                <p className='font-bold text-sm'>Total Guests</p>
                <span className='font-bold text-sm'>{totalGuest}</span>
            </div>
            <hr />
            <button onClick={() => setShowGuestAndRoomCounter(false)} className='text-center px-5 py-3 font-bold rounded-full bg-black text-white hover:opacity-75 hover:cursor-pointer transition duration-200 active:scale-90'>Close</button>
        </ul>
    </section>
  )
}

export default GuestAndRoomCounter
