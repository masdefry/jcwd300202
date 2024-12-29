'use client'

import React from 'react'
import Image from 'next/image'
import { CiBookmarkPlus } from "react-icons/ci";

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
    <div className='w-[135px] h-[240px]  md:w-[300px] md:h-[440px] rounded-md overflow-hidden border border-slate-200 bg-white relative shadow-md'>
        <div className='flex flex-col'>
            <figure className={`${isPending ? 'skeleton' : 'bg-slate-200' } md:h-[220px] h-[100px] rounded-none overflow-hidden`}>
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
            <div className='text-xs font-semibold text-white bg-gray-900 flex md:hidden p-1.5 gap-1 items-center'>   
                <CiBookmarkPlus size={17}/>
                Book now!
            </div>
        </div>
        <div className='flex flex-col md:gap-2 p-1.5 md:p-3'>
            <div className='hidden md:flex items-center gap-2'>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-black text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>Roomify</div>
                <div className={`${isPending ? 'skeleton text-transparent' : 'bg-blue-600 text-white'} text-xs font-semibold py-1 px-3 rounded-full w-fit`}>{level}</div>
            </div>
            <hgroup className='hidden md:flex flex-col gap-1 '>
                <h1 className={`text-lg font-bold ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-fit`}>{propertyName.length > 50 ? propertyName.slice(0 ,50) + '...' : propertyName}</h1>
                <h6 className={`text-base font-light ${isPending ? 'text-transparent skeleton w-fit' : 'text-black' } h-fit`}>{city}, {country}</h6>
            </hgroup>
            <hgroup className='flex md:hidden flex-col '>
                <h1 className={`text-sm font-bold ${isPending ? 'text-transparent skeleton w-fit' : 'text-gray-900' } h-fit`}>{propertyName.length > 11 ? propertyName.slice(0 ,11) + '...' : propertyName}</h1>
                <h6 className={`text-sm font-light ${isPending ? 'text-transparent skeleton w-fit' : 'text-gray-600' } h-fit`}>{city.length > 11 ? city.slice(0 ,11) + '...' : city}</h6>
            </hgroup>
            {
                isPending ? (
                <section className='flex  text-xs md:text-lg items-center text-transparent gap-2 h-fit skeleton w-fit font-medium'>
                    <p className=' text-lg font-bold w-fit'>8.9</p>
                    <div className='h-[2px] w-[2px] rounded-full'></div>
                    <p className=''>33 Reviews</p>
                </section>
                ) : (
                <section className='flex text-xs md:text-lg items-center gap-2 font-medium'>
                    <p className='text-gray-900 font-bold w-fit'>{ratingAvg}</p>
                    <div className='h-[2px] w-[2px] rounded-full bg-gray-600'></div>
                    <p className='text-gray-600'>{totalReviews} Reviews</p>
                </section>
                )
            }
            <section className='w-full flex md:hidden justify-start gap-2 mt-1'>
                <p className={`font-bold text-orange-600 text-sm h-[1em] ${isPending && 'skeleton text-transparent'}`}>Rp{price}</p>
            </section>
            <section className='w-full flex md:hidden justify-start gap-2 mt-[7px]'>
                <p className={`font-light text-gray-400 text-xs h-[1em] ${isPending && 'skeleton text-transparent'}`}>After tax & price</p>
            </section>
        </div>
        <section className='absolute bottom-3 w-full right-3 hidden md:flex justify-end items-center gap-2 mt-14'>
            <p className={`font-normal text-sm h-[1em] ${isPending ? 'skeleton text-transparent' : 'text-gray-700'}`}>Starts from</p>
            <p className={`font-bold text-xl h-[1em] ${isPending && 'skeleton text-transparent'}`}>Rp{price}</p>
        </section>
    </div>
  )
}

export default Card
