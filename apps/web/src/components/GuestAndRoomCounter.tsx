'use client'

import Separator from '@/features/auth/components/Separator'
import React, { useEffect } from 'react'
import  useSearchHook from '@/hooks/useSearchHook'

interface IGuestAndRoomCounterProps {
    setShowGuestAndRoomCounter: any,
    setAllGuest: any,
    allGuest: any,
    setFieldValue: any,
    totalGuest: { children: number, adult: number },
    setTotalGuest: any
}

const GuestAndRoomCounter = ({ setFieldValue, setShowGuestAndRoomCounter, setAllGuest, allGuest, totalGuest, setTotalGuest }: IGuestAndRoomCounterProps) => {


    const updateTotalGuest = () => {
        if(allGuest.totalGuest <= 10) {
            setTotalGuest((state: { adult: number, children: number }) => { 
                state.adult = Math.min(state.adult, 10) 
                state.children = Math.min(state.children, 10)
                return state
            })
            setAllGuest({totalGuest: Math.min(totalGuest.adult + totalGuest.children, 10)})
        }
    };

    useEffect(() => {
        updateTotalGuest()
    }, [totalGuest])

  return (
    <section className='bg-white rounded-lg w-full 2xl:w-[300px] p-3 shadow-md'>
        <h1 className='text-sm font-bold mb-5'>Total Guest & Room</h1>
        <ul className='flex flex-col gap-3'>
            <li className='flex items-center justify-between'>
                <p className='text-sm'>Adult</p>
                <div className='flex items-center justify-center gap-4'>
                    <button 
                    type='button'
                        onClick={
                            () => totalGuest.adult > 1
                             && (setTotalGuest({ adult: totalGuest.adult - 1, children: totalGuest.children }))
                             && (setAllGuest({totalGuest: allGuest.totalGuest - 1}))
                             && setFieldValue('adult', totalGuest.adult)
                             && setFieldValue('children', totalGuest.children)
                        }
                        className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-
                    </button> 
                    <p className='text-sm'>{totalGuest.adult}</p>
                    <button 
                    type='button'
                        onClick={
                            () => allGuest.totalGuest < 10
                             && (setTotalGuest({ adult: totalGuest.adult + 1, children: totalGuest.children }))
                             && (setAllGuest({totalGuest: allGuest.totalGuest + 1})) 
                             && setFieldValue('adult', totalGuest.adult)
                             && setFieldValue('children', totalGuest.children)
                        }
                        disabled={totalGuest.adult + totalGuest.children >= 10}  
                        className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+
                    </button> 
                </div> 
            </li>
            <li className='flex items-center justify-between'>
                <p className='text-sm'>Children <span className='text-xs'>(age under 16)</span></p>
                <div className='flex items-center justify-center gap-4'>
                    <button 
                    type='button'
                        onClick={
                        () => totalGuest.children > 0
                             && (setTotalGuest({ children: totalGuest.children - 1, adult: totalGuest.adult }))
                             && (setAllGuest({totalGuest: allGuest.totalGuest}))
                             && setFieldValue('adult', totalGuest.adult)
                             && setFieldValue('children', totalGuest.children)
                    }
                    
                        

                        className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>-
                    </button> 
                    <p className='text-sm'>{totalGuest.children}</p>
                    <button 
                    type='button'
                        onClick={
                            () => allGuest.totalGuest < 10
                             && (setTotalGuest({ adult: totalGuest.adult, children: totalGuest.children + 1}))
                             && (setAllGuest({totalGuest: allGuest.totalGuest + 1}))
                             && setFieldValue('adult', totalGuest.adult)
                             && setFieldValue('children', totalGuest.children)
                        }
                        disabled={totalGuest.children + totalGuest.children >= 10}  
                        className='transition duration-100 h-8 w-8 flex font-bold hover:text-white items-center justify-center hover:bg-slate-400 hover:cursor-pointer active:scale-90'>+
                    </button> 
                 
                </div>   
            </li>
            <hr />
            <div className='w-full flex items-center justify-between mt-4'>
                <p className='font-bold text-sm'>Total Guests</p>
                <span className='font-bold text-sm'>{allGuest.totalGuest}</span>
            </div>
            <hr />
            <button type='button' onClick={() => setShowGuestAndRoomCounter(false)} className='text-center px-5 py-3 font-bold rounded-full bg-black text-white hover:opacity-75 hover:cursor-pointer transition duration-200 active:scale-90'>Close</button>
        </ul>
    </section>
  )
}

export default GuestAndRoomCounter
