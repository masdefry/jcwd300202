'use client'

import React from 'react'
import Image from 'next/image'
import { CiLocationOn } from 'react-icons/ci'

interface ICardSmallProps {
    isPending: boolean,
    level?: string,
    propertyName?: string,
    city?: string,
    country?: string,
    ratingAvg?: number,
    totalReviews?: number,
    price?: number,
    imageUrl?: string
}

const CardSmall = ({isPending, imageUrl = '', level = 'loading', propertyName = 'loading', city = 'loading', country = 'loading', ratingAvg = 0, totalReviews = 0, price = 1000000}: ICardSmallProps) => {
  return (
    <div className=' w-[240px] h-[350px] rounded-md overflow-hidden border border-slate-200 bg-white relative'>
        <div>
            <figure className={`${isPending ? 'skeleton' : 'bg-slate-200' } h-[150px] rounded-none overflow-hidden`}>
                {
                    !isPending && (
                        <Image 
                        src={imageUrl}
                        width={1000}
                        height={1000}
                        alt=''
                        className='object-cover w-full h-full'
                        />
                    )
                }
            </figure>
        </div>
        <div className='flex flex-col gap-2 p-3'>
            <div className='flex items-center gap-2'>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-black text-white'} text-[10px] font-semibold py-[2px] px-2 rounded-full w-fit`}>Roomify</div>
            </div>
            <hgroup className='flex flex-col gap-1 '>
                <h1 className={`text-base font-bold ${isPending ? 'text-transparent skeleton w-fit' : 'text-gray-900' } h-fit`}>{propertyName.length > 50 ? propertyName.slice(0 ,50) + '...' : propertyName}</h1>
                <h6 className={`text-sm flex items-center gap-1.5 font-medium ${isPending ? 'text-transparent skeleton w-fit' : 'text-gray-600' } h-fit`}><CiLocationOn size={18} />{city}, {country}</h6>
            </hgroup>
            {
                isPending ? (
                <section className='flex items-center text-transparent gap-2 h-fit skeleton w-fit'>
                    <p className=' text-sm font-bold w-fit'>8.9</p>
                    <div className='h-[2px] w-[2px] rounded-full'></div>
                    <p className='text-sm'>33 Reviews</p>
                </section>
                ) : (
                    totalReviews > 0 && (
                        <section className='flex items-center gap-2'>
                            <p className='text-black text-sm font-bold w-fit'>{ratingAvg}</p>
                            <div className='h-[2px] w-[2px] rounded-full bg-gray-600'></div>
                            <p className='text-gray-600 text-sm'>{totalReviews} Reviews</p>
                        </section>
                    )
                )
            }
        </div>
        <section className='absolute bottom-3 w-full right-3 flex justify-end items-center gap-2 mt-14'>
            <p className={`font-normal text-xs h-[1em] ${isPending ? 'skeleton text-transparent' : 'text-gray-700'}`}>Starts from</p>
            <p className={`font-bold text-lg h-[1em] ${isPending && 'skeleton text-transparent'}`}>Rp{price}</p>
        </section>
    </div>
  )
}

export default CardSmall
