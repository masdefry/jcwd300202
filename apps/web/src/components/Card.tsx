'use client'

import React from 'react'
import Image from 'next/image'

interface ICardProps {
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

const Card = ({isPending, imageUrl = '', level = 'loading', propertyName = 'loading', city = 'loading', country = 'loading', ratingAvg = 0, totalReviews = 0, price = 1000000}: ICardProps) => {
  return (
    <div className=' w-[300px] h-[440px] rounded-md overflow-hidden border border-slate-200 bg-white relative'>
        <div>
            <figure className={`${isPending ? 'skeleton' : 'bg-slate-200' } h-[220px] rounded-none overflow-hidden`}>
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
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-black text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>Roomify</div>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-blue-600 text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>{level}</div>
            </div>
            <hgroup className='flex flex-col gap-1 '>
                <h1 className={`text-lg font-bold ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-fit`}>{propertyName.length > 50 ? propertyName.slice(0 ,50) + '...' : propertyName}</h1>
                <h6 className={`text-base font-light ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-fit`}>{city}, {country}</h6>
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
                    <p className='text-black text-lg font-bold w-fit'>{ratingAvg}</p>
                    <div className='h-[2px] w-[2px] rounded-full bg-gray-600'></div>
                    <p className='text-gray-600'>{totalReviews} Reviews</p>
                </section>
                )
            }
        </div>
        <section className='absolute bottom-3 w-full right-3 flex justify-end items-center gap-2 mt-14'>
            <p className={`font-normal text-sm h-[1em] ${isPending ? 'skeleton text-transparent' : 'text-gray-700'}`}>Starts from</p>
            <p className={`font-bold text-xl h-[1em] ${isPending && 'skeleton text-transparent'}`}>Rp{price}</p>
        </section>
    </div>
  )
}

export default Card
