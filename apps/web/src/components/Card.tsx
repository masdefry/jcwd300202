'use client'

import React from 'react'

interface ICardProps {
    isPending: boolean
}

const Card = ({isPending}: ICardProps) => {
  return (
    <div className=' w-[300px] rounded-md overflow-hidden border border-slate-200 bg-white'>
        <div>
            <figure className={`${isPending ? 'skeleton' : 'bg-gray-600' } h-[220px] rounded-none`}>

            </figure>
        </div>
        <div className='flex flex-col gap-2 p-3'>
            <div className='flex items-center gap-2'>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-black text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>Roomify</div>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-blue-600 text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>Excelent</div>
            </div>
            <hgroup className='flex flex-col gap-2 '>
                <h1 className={`text-lg font-bold ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-[1em]`}>Pan Pacific Jakarta</h1>
                <h6 className={`text-base font-light ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-[1em]`}>Jakarta, Indonesia</h6>
            </hgroup>
            {
                isPending ? (
                <section className='flex items-center text-transparent gap-2 h-fit skeleton w-fit'>
                    <p className=' text-lg font-bold w-fit'>8.9</p>
                    <div className='h-[2px] w-[2px] rounded-full'></div>
                    <p className=''>33 Reviews</p>
                </section>
                ) : (
                <section className='flex items-center gap-2'>
                    <p className='text-black text-lg font-bold w-fit'>8.9</p>
                    <div className='h-[2px] w-[2px] rounded-full bg-gray-600'></div>
                    <p className='text-gray-600'>33 Reviews</p>
                </section>
                )
            }
            <section className='flex justify-end items-center gap-2 mt-14'>
                <p className={`font-normal text-sm h-[1em] ${isPending ? 'skeleton text-transparent' : 'text-gray-700'}`}>1 Night</p>
                <p className={`font-bold text-xl h-[1em] ${isPending && 'skeleton text-transparent'}`}>Rp7.800.000</p>
            </section>
        </div>
    </div>
  )
}

export default Card
